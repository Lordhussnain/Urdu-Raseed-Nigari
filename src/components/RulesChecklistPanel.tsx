import React from 'react';
import { Check, Eye, RotateCcw } from 'lucide-react';
import { EXAM_RULES, ExamRule, ReceiptCategory, RuleGroup } from '../data/receiptsData';

interface RulesChecklistPanelProps {
  activeRuleHighlight: number | null;
  onSelectRule: (ruleId: number | null) => void;
  checkedRules: number[];
  onToggleChecked: (ruleId: number) => void;
  onResetChecked: () => void;
  currentReceiptCategory: ReceiptCategory;
}

const GROUP_LABELS: { key: RuleGroup; label: string; range: string }[] = [
  { key: 'header', label: 'Header & Fixed Opening', range: 'Rule 01' },
  { key: 'body', label: 'Amounts & Continuous Body', range: 'Rules 02–10' },
  { key: 'closing', label: 'Bottom Layout & Stamp', range: 'Rules 11–15' },
];

export const RulesChecklistPanel: React.FC<RulesChecklistPanelProps> = ({
  activeRuleHighlight,
  onSelectRule,
  checkedRules,
  onToggleChecked,
  onResetChecked,
  currentReceiptCategory,
}) => {
  const checkedCount = checkedRules.length;

  const renderRuleRow = (rule: ExamRule) => {
    const isChecked = checkedRules.includes(rule.id);
    const isSpotlighted = activeRuleHighlight === rule.id;

    return (
      <div
        key={rule.id}
        id={`rule-card-${rule.id}`}
        className={`group rounded-lg border transition-colors duration-150 ${
          isSpotlighted
            ? 'bg-amber-50/90 border-amber-400/80'
            : 'bg-white border-stone-200/90 hover:border-stone-300'
        }`}
      >
        <div className="flex items-start gap-3 p-3.5">
          <button
            type="button"
            onClick={() => onToggleChecked(rule.id)}
            aria-label={`Mark rule ${rule.id} (${rule.title}) as reviewed`}
            aria-pressed={isChecked}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${
              isChecked
                ? 'bg-blue-900 border-blue-900 text-white'
                : 'bg-white border-stone-300 text-transparent hover:border-blue-800'
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => onSelectRule(isSpotlighted ? null : rule.id)}
            className="flex-1 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 rounded"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[13.5px] font-semibold text-stone-900 leading-snug">
                <span className="font-mono text-xs text-stone-500 mr-1.5 tabular-nums">
                  {String(rule.id).padStart(2, '0')}.
                </span>
                {rule.title}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium shrink-0 whitespace-nowrap ${
                  isSpotlighted
                    ? 'text-amber-800'
                    : 'text-stone-400 group-hover:text-blue-900'
                }`}
              >
                <Eye className="h-3 w-3" />
                {isSpotlighted ? 'Active' : 'Locate'}
              </span>
            </div>

            <div
              dir="rtl"
              lang="ur"
              className="urdu-nastaliq text-[14.5px] leading-[1.9] text-blue-950 font-semibold mt-1"
            >
              {rule.urduTag}
            </div>

            <p className="text-xs leading-relaxed text-stone-600 mt-1.5">
              {rule.description}
            </p>

            <p
              dir="rtl"
              lang="ur"
              className="urdu-nastaliq text-[13.5px] leading-[2.0] text-stone-700 mt-1.5 pt-1.5 border-t border-stone-100"
            >
              {rule.urduInstruction}
            </p>

            {rule.tip && (
              <p className="text-[11.5px] leading-relaxed text-stone-500 mt-1.5 pt-1.5 border-t border-stone-100">
                {rule.tip}
              </p>
            )}
          </button>
        </div>
      </div>
    );
  };

  const highlightSale =
    currentReceiptCategory === 'sale' || currentReceiptCategory === 'blueprint';
  const highlightNonSale =
    currentReceiptCategory === 'non-sale' || currentReceiptCategory === 'blueprint';

  return (
    <aside
      id="rules-checklist-section"
      aria-label="15-Point Exam Rules Checklist"
      className="bg-[#FAF8F3] border border-stone-200/90 rounded-lg p-5 sm:p-6 flex flex-col gap-5 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto"
    >
      {/* Header & Progress */}
      <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900 tracking-tight">
            15-Point Bilingual Rules
          </h2>
          <p className="text-xs text-stone-500 mt-1 tabular-nums">
            {checkedCount} of 15 verified · Click any rule to spotlight on sheet
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {activeRuleHighlight !== null && (
            <button
              type="button"
              onClick={() => onSelectRule(null)}
              className="px-2.5 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200/70 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Clear Spot
            </button>
          )}
          {checkedCount > 0 && (
            <button
              type="button"
              onClick={onResetChecked}
              title="Reset checklist progress"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Sale vs Non-Sale Terminology Reminder */}
      <div className="rounded-md bg-white border border-stone-200/90 p-3.5 text-xs space-y-2">
        <div className="flex items-center justify-between text-stone-500">
          <span className="font-semibold text-stone-800">
            {currentReceiptCategory === 'blueprint'
              ? 'Formula Selector Rule'
              : 'Active Receipt Formula'}
          </span>
          <span className="font-mono tabular-nums">
            {currentReceiptCategory === 'blueprint'
              ? 'All 6 Receipts'
              : currentReceiptCategory === 'sale'
                ? 'Receipts 1, 2, 4'
                : 'Receipts 3, 5, 6'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div
            className={`p-2 rounded border ${
              highlightSale
                ? 'bg-blue-50/70 border-blue-200 text-stone-900'
                : 'bg-stone-50/70 border-stone-200/70 text-stone-500'
            }`}
          >
            <div className="font-medium text-[11px] mb-1">Sale Receipts (1, 2, 4)</div>
            <div dir="rtl" lang="ur" className="urdu-nastaliq text-[14px] leading-[1.9]">
              کل قیمت مبلغ / بابت قیمت فروخت
            </div>
          </div>
          <div
            className={`p-2 rounded border ${
              highlightNonSale
                ? 'bg-blue-50/70 border-blue-200 text-stone-900'
                : 'bg-stone-50/70 border-stone-200/70 text-stone-500'
            }`}
          >
            <div className="font-medium text-[11px] mb-1">Non-Sale (3, 5, 6)</div>
            <div dir="rtl" lang="ur" className="urdu-nastaliq text-[14px] leading-[1.9]">
              کل رقم مبلغ / بابت
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Rules List */}
      <div className="space-y-6">
        {GROUP_LABELS.map((group) => {
          const groupRules = EXAM_RULES.filter((r) => r.group === group.key);
          return (
            <section key={group.key} className="space-y-2.5">
              <div className="flex items-baseline justify-between text-xs text-stone-500 px-0.5">
                <h3 className="font-semibold text-stone-800">{group.label}</h3>
                <span className="font-mono tabular-nums">{group.range}</span>
              </div>
              <div className="space-y-2">{groupRules.map(renderRuleRow)}</div>
            </section>
          );
        })}
      </div>
    </aside>
  );
};
