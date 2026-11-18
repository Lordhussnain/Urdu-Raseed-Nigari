import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { MASTER_BLUEPRINT, RECEIPTS } from './data/receiptsData';
import { ExamReceiptSheet } from './components/ExamReceiptSheet';
import { RulesChecklistPanel } from './components/RulesChecklistPanel';
import { PrintPreviewOverlay, PrintScope } from './components/PrintPreviewOverlay';

const STORAGE_KEY = 'urdu_raseed_checked_rules_v1';
const ALL_TABS = [MASTER_BLUEPRINT, ...RECEIPTS];

export default function App() {
  // Default home view is 0 (Master Format Blueprint)
  const [activeReceiptId, setActiveReceiptId] = useState<number>(0);
  const [activeRuleHighlight, setActiveRuleHighlight] = useState<number | null>(null);
  const [receipt4Variant, setReceipt4Variant] = useState<'video' | 'book'>('video');
  const [showRuledLines, setShowRuledLines] = useState<boolean>(true);
  const [showBlueprintMarkers, setShowBlueprintMarkers] = useState<boolean>(true);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState<boolean>(false);
  const [printScope, setPrintScope] = useState<PrintScope>('current');
  const [checkedRules, setCheckedRules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((n) => typeof n === 'number');
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedRules));
    } catch {
      // Ignore storage write errors
    }
  }, [checkedRules]);

  const activeReceipt =
    ALL_TABS.find((item) => item.id === activeReceiptId) ?? MASTER_BLUEPRINT;

  const handleSelectRule = (ruleId: number | null) => {
    setActiveRuleHighlight(ruleId);
    if (ruleId !== null) {
      const sheetTarget =
        document.getElementById(`rule-anchor-${ruleId}`) ||
        document.querySelector(`[data-rule-id="${ruleId}"]`);
      if (sheetTarget) {
        sheetTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      const cardTarget = document.getElementById(`rule-card-${ruleId}`);
      if (cardTarget) {
        cardTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleToggleChecked = (ruleId: number) => {
    setCheckedRules((prev) =>
      prev.includes(ruleId) ? prev.filter((id) => id !== ruleId) : [...prev, ruleId]
    );
  };

  const handleResetChecked = () => {
    setCheckedRules([]);
  };

  const openPrintPreview = (scope: PrintScope) => {
    setPrintScope(scope);
    setIsPrintPreviewOpen(true);
  };

  const handlePrevReceipt = () => {
    setActiveReceiptId((prev) => (prev > 0 ? prev - 1 : RECEIPTS.length));
  };

  const handleNextReceipt = () => {
    setActiveReceiptId((prev) => (prev < RECEIPTS.length ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-stone-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="no-print border-b border-stone-300/80 bg-[#FAF8F3]/95 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold tracking-tight text-stone-950 whitespace-nowrap shrink-0"
          >
            Urdu Qawaid-o-Insha
          </a>

          {/* Zone 2: 4 concise single-line text links */}
          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <button
              type="button"
              onClick={() => setActiveReceiptId(0)}
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Format Blueprint
            </button>
            <a
              href="#receipt-stage"
              onClick={() => {
                if (activeReceiptId === 0) setActiveReceiptId(1);
              }}
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              6 Receipts
            </a>
            <a
              href="#rules-checklist-section"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              15-Point Rules
            </a>
            <button
              type="button"
              onClick={() => openPrintPreview('packet')}
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Complete Packet
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openPrintPreview('current')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Print Sheet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main
        id="top"
        className={`flex-1 max-w-[1360px] w-full mx-auto px-5 sm:px-8 py-8 sm:py-10 space-y-8 ${
          isPrintPreviewOpen ? 'no-print' : ''
        }`}
      >
        {/* Editorial Textbook Header + 7-Tab Selector Rail (00 Blueprint + 01–06 Receipts) */}
        <section className="no-print space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 border-b border-stone-300/80 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
                <span>Pages 96–99</span>
                <span aria-hidden="true">·</span>
                <span>Question No. 7 (Raseed Nigari)</span>
                <span aria-hidden="true">·</span>
                <span>Master Format & 6 Solved Receipts</span>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-stone-950 tracking-tight text-balance">
                {activeReceiptId === 0
                  ? 'Master Receipt Format & Instructions'
                  : 'Raseed Nigari Textbook Viewer'}
              </h1>
              <p className="text-sm sm:text-[15px] leading-relaxed text-stone-600">
                {activeReceiptId === 0
                  ? 'Follow numbered markers 1–15 on the ruled Urdu blueprint below to master the exact board-exam layout before reviewing the six solved textbook receipts.'
                  : 'Solved textbook receipt formatted strictly according to all 15 board-exam scoring rules—with 4-fold amount notation, continuous single-paragraph prose, and A4 print sheets.'}
              </p>
            </div>

            {/* Quick Prev / Next Stepper */}
            <div className="flex items-center gap-2 self-start lg:self-end shrink-0">
              <button
                type="button"
                onClick={handlePrevReceipt}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300/90 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextReceipt}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300/90 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* 7-Item Selector Rail: 00 Master Blueprint + 01–06 Textbook Receipts */}
          <div
            role="tablist"
            aria-label="Select Format Blueprint or Receipt"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5"
          >
            {ALL_TABS.map((item) => {
              const isActive = item.id === activeReceipt.id;
              const isBlueprint = item.id === 0;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveReceiptId(item.id)}
                  className={`text-left px-3.5 py-3 rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${
                    isActive
                      ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                      : 'bg-[#FAF8F3] text-stone-800 border-stone-300/80 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums">
                    <span className={isActive ? 'text-blue-100' : 'text-stone-500'}>
                      {String(item.id).padStart(2, '0')}
                    </span>
                    <span className={isActive ? 'text-blue-200' : 'text-stone-400'}>
                      {isBlueprint ? 'Template' : item.textbookPages}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-semibold truncate">
                    {isBlueprint
                      ? 'Format Blueprint'
                      : item.englishTitle.replace(' Receipt', '')}
                  </div>
                  <div
                    dir="rtl"
                    lang="ur"
                    className={`urdu-nastaliq text-[14px] leading-[1.8] truncate mt-0.5 ${
                      isActive ? 'text-blue-50' : 'text-stone-600'
                    }`}
                  >
                    {item.urduTitle}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Two-Zone Study Workspace: 65% Ruled Exam Sheet Stage / 35% 15-Rule Bilingual Checklist */}
        <section
          id="receipt-stage"
          className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
        >
          {/* Left / Main Stage: Ruled Exam Sheet */}
          <div className="lg:col-span-8 space-y-4">
            {/* Sheet Control Bar */}
            <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-[#FAF8F3] border border-stone-200/90 rounded-lg px-4 py-3">
              {/* Clean unboxed receipt metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                <span className="font-mono font-medium text-stone-900 tabular-nums">
                  {activeReceipt.id === 0
                    ? '00 · Master Blueprint'
                    : `Receipt ${String(activeReceipt.id).padStart(2, '0')} / 06`}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeReceipt.category === 'blueprint'
                    ? 'Universal Exam Template (خاکہ)'
                    : activeReceipt.category === 'sale'
                      ? 'Sale Receipt (کل قیمت مبلغ)'
                      : 'Non-Sale Receipt (کل رقم مبلغ)'}
                </span>
                {activeReceipt.id !== 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {activeReceipt.totalAmountDigits}
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{activeReceipt.textbookPages}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Master Blueprint Numbered Markers Toggle */}
                {activeReceipt.id === 0 && (
                  <button
                    type="button"
                    onClick={() => setShowBlueprintMarkers((prev) => !prev)}
                    aria-pressed={showBlueprintMarkers}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300/90 hover:bg-stone-50 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {showBlueprintMarkers ? 'Markers: 1–15' : 'Markers: Hidden'}
                  </button>
                )}

                {/* Receipt 4 Book vs Video Toggle */}
                {activeReceipt.id === 4 && (
                  <div
                    role="group"
                    aria-label="Receipt 4 cow terminology standard"
                    className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg"
                  >
                    <button
                      type="button"
                      onClick={() => setReceipt4Variant('video')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        receipt4Variant === 'video'
                          ? 'bg-white text-blue-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Video: شاخ
                    </button>
                    <button
                      type="button"
                      onClick={() => setReceipt4Variant('book')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        receipt4Variant === 'book'
                          ? 'bg-white text-blue-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Textbook: راس
                    </button>
                  </div>
                )}

                {/* Paper Ruled Lines Toggle */}
                <button
                  type="button"
                  onClick={() => setShowRuledLines((prev) => !prev)}
                  aria-pressed={showRuledLines}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300/90 hover:bg-stone-50 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showRuledLines ? 'Lines: Ruled' : 'Lines: Blank'}
                </button>
              </div>
            </div>

            {/* Bilingual Video Format Instructions Banner (Visible on Home Blueprint View 00) */}
            {activeReceipt.id === 0 && (
              <div className="no-print bg-[#FAF8F3] border border-stone-300/90 rounded-lg p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-sm font-semibold text-stone-900">
                    How to Write a Full-Marks Exam Receipt (Video Format Guide)
                  </h2>
                  <span className="text-xs text-stone-500">
                    Click any numbered marker (1–15) on the sheet below
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                  <div className="space-y-1.5 text-stone-600">
                    <p>
                      <strong>1. Top 3-Line Heading:</strong> Center{' '}
                      <span dir="rtl" lang="ur" className="font-semibold text-stone-900">
                        سوال نمبر (7)
                      </span>
                      , then{' '}
                      <span dir="rtl" lang="ur" className="font-semibold text-stone-900">
                        رسید نگاری
                      </span>
                      , then{' '}
                      <span dir="rtl" lang="ur" className="font-semibold text-stone-900">
                        "رسید بابت ۔۔۔"
                      </span>
                      , followed by{' '}
                      <span dir="rtl" lang="ur" className="font-semibold text-stone-900">
                        باعثِ تحریر آنکہ
                      </span>
                      .
                    </p>
                    <p>
                      <strong>2. Continuous Sentence & 4× Amount:</strong> Write the entire body
                      without paragraph breaks. Lock digits with{' '}
                      <span className="font-mono text-stone-900">=</span> and slanted{' '}
                      <span className="font-mono text-stone-900">/=</span>, end words with{' '}
                      <span dir="rtl" lang="ur" className="font-semibold text-stone-900">
                        صرف
                      </span>
                      , and repeat half value.
                    </p>
                  </div>
                  <div
                    dir="rtl"
                    lang="ur"
                    className="urdu-nastaliq text-[14px] leading-[2.1] text-stone-800 space-y-1 border-t md:border-t-0 md:border-r border-stone-200/90 pt-3 md:pt-0 md:pr-4"
                  >
                    <p>
                      <strong>امتحانی ہدایات:</strong> سرخی کی تین سطور کے بعد "باعثِ تحریر آنکہ"
                      درمیان میں لکھیں۔ کل قیمت/رقم سے لے کر "بوقتِ ضرورت کام آئے۔" تک پورا متن
                      بغیر پیراگراف توڑے ایک مسلسل جملے میں تحریر کریں۔
                    </p>
                    <p>
                      نیچے دائیں "گواہ شد"، درمیان میں "العبد" (اور اس کے نیچے "تحریر")، بائیں
                      "گواہ شد" اور بائیں کونے میں "(رسیدی ٹکٹ)" کا ڈبہ مع آدھا اندر آدھا باہر
                      کراس بنائیں۔
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Receipt 4 Book vs Video Explainer Callout */}
            {activeReceipt.specialNote && (
              <div className="no-print bg-[#FAF8F3] border border-stone-300/90 rounded-lg p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold text-stone-900">
                    {activeReceipt.specialNote.title}
                  </h3>
                  <span className="text-xs font-medium text-blue-900">
                    Active term: {receipt4Variant === 'video' ? 'ایک شاخ گائے' : 'ایک راس گائے'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-stone-600">
                  {activeReceipt.specialNote.englishSummary}
                </p>
                <p
                  dir="rtl"
                  lang="ur"
                  className="urdu-nastaliq text-[14.5px] leading-[2.1] text-stone-800 pt-1 border-t border-stone-200/80"
                >
                  {activeReceipt.specialNote.urduSummary}
                </p>
              </div>
            )}

            {/* Authentic Ruled Exam Paper Sheet */}
            <ExamReceiptSheet
              receipt={activeReceipt}
              activeRuleHighlight={activeRuleHighlight}
              onSelectRule={(ruleId) =>
                handleSelectRule(activeRuleHighlight === ruleId ? null : ruleId)
              }
              receipt4Variant={receipt4Variant}
              showRuledLines={showRuledLines}
              showRuleMarkers={activeReceipt.id === 0 && showBlueprintMarkers}
              isPrint={false}
            />
          </div>

          {/* Right Deck: Interactive 15-Point Bilingual Checklist */}
          <div className="no-print lg:col-span-4 lg:sticky lg:top-20">
            <RulesChecklistPanel
              activeRuleHighlight={activeRuleHighlight}
              onSelectRule={handleSelectRule}
              checkedRules={checkedRules}
              onToggleChecked={handleToggleChecked}
              onResetChecked={handleResetChecked}
              currentReceiptCategory={activeReceipt.category}
            />
          </div>
        </section>

        {/* Format & Anatomy Quick Reference Section */}
        <section
          id="anatomy-guide-section"
          className="no-print pt-6 border-t border-stone-300/80 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-950 tracking-tight">
              Exam Scoring Invariants Summary
            </h2>
            <p className="text-xs text-stone-500">
              Three critical formatting checks examiners look for across all six receipts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#FAF8F3] border border-stone-200/90 rounded-lg p-5 space-y-2.5">
              <div className="text-xs font-mono text-stone-500">01 · Four-Fold Amount Rule</div>
              <h3 className="text-sm font-semibold text-stone-900">
                Digits & Words Repeated at Half Value
              </h3>
              <p className="text-xs leading-relaxed text-stone-600">
                Digits always begin with <span className="font-mono">=</span> and close with a
                slanted <span className="font-mono">/=</span> (never a straight bar{' '}
                <span className="font-mono">|</span>), followed by Urdu words ending in{' '}
                <span dir="rtl" lang="ur" className="font-semibold">
                  صرف
                </span>
                , then repeated at half value using{' '}
                <span dir="rtl" lang="ur" className="font-semibold">
                  نصف جن کے مبلغ
                </span>
                .
              </p>
            </div>

            <div className="bg-[#FAF8F3] border border-stone-200/90 rounded-lg p-5 space-y-2.5">
              <div className="text-xs font-mono text-stone-500">02 · Sale vs. Non-Sale Wording</div>
              <h3 className="text-sm font-semibold text-stone-900">
                کل قیمت vs. کل رقم Distinction
              </h3>
              <p className="text-xs leading-relaxed text-stone-600">
                Sale receipts (<strong>1, 2, 4</strong>: Wheat, Motorcycle, Cow) use{' '}
                <span dir="rtl" lang="ur" className="font-semibold">
                  کل قیمت مبلغ
                </span>{' '}
                and{' '}
                <span dir="rtl" lang="ur" className="font-semibold">
                  بابت قیمت فروخت
                </span>
                . Non-sale receipts (<strong>3, 5, 6</strong>: Rent, Land Revenue, Stipend) use{' '}
                <span dir="rtl" lang="ur" className="font-semibold">
                  کل رقم مبلغ
                </span>{' '}
                and{' '}
                <span dir="rtl" lang="ur" className="font-semibold">
                  بابت
                </span>
                .
              </p>
            </div>

            <div className="bg-[#FAF8F3] border border-stone-200/90 rounded-lg p-5 space-y-2.5">
              <div className="text-xs font-mono text-stone-500">03 · Bottom Grid & Stamp</div>
              <h3 className="text-sm font-semibold text-stone-900">
                RTL Symmetry & Half-Out Cross
              </h3>
              <p className="text-xs leading-relaxed text-stone-600">
                Place <span dir="rtl" lang="ur" className="font-semibold">گواہ شد</span> on the
                right and left, <span dir="rtl" lang="ur" className="font-semibold">العبد</span> in
                the center with <span dir="rtl" lang="ur" className="font-semibold">تحریر</span>{' '}
                centered underneath, and draw the{' '}
                <span dir="rtl" lang="ur" className="font-semibold">رسیدی ٹکٹ</span> square in the
                bottom-left corner with its cross extending half outside the box.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="no-print border-t border-stone-300/70 bg-[#FAF8F3] mt-12">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>Urdu Qawaid-o-Insha · Pages 96–99 · Sawal No. 7 (Raseed Nigari)</span>
          <button
            type="button"
            onClick={() => openPrintPreview('packet')}
            className="text-blue-900 hover:underline font-medium cursor-pointer"
          >
            Print Blueprint + All 6 Receipts (A4)
          </button>
        </div>
      </footer>

      {/* Dedicated A4 Print Preview Modal */}
      <PrintPreviewOverlay
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        blueprint={MASTER_BLUEPRINT}
        receipts={RECEIPTS}
        activeReceiptId={activeReceiptId}
        printScope={printScope}
        onChangePrintScope={setPrintScope}
        showRuledLines={showRuledLines}
        onToggleRuledLines={() => setShowRuledLines((prev) => !prev)}
        showBlueprintMarkers={showBlueprintMarkers}
        onToggleBlueprintMarkers={() => setShowBlueprintMarkers((prev) => !prev)}
        receipt4Variant={receipt4Variant}
      />
    </div>
  );
}
