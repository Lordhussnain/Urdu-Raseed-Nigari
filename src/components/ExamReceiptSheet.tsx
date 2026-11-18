import React from 'react';
import { ReceiptItem } from '../data/receiptsData';
import { RaseediTicketStamp } from './RaseediTicketStamp';

interface ExamReceiptSheetProps {
  receipt: ReceiptItem;
  activeRuleHighlight?: number | null;
  onSelectRule?: (ruleId: number) => void;
  receipt4Variant: 'video' | 'book';
  showRuledLines: boolean;
  showRuleMarkers?: boolean;
  isPrint?: boolean;
}

export const ExamReceiptSheet: React.FC<ExamReceiptSheetProps> = ({
  receipt,
  activeRuleHighlight = null,
  onSelectRule,
  receipt4Variant,
  showRuledLines,
  showRuleMarkers = false,
  isPrint = false,
}) => {
  const isHighlighted = (ruleId?: number) =>
    !isPrint && ruleId !== undefined && activeRuleHighlight === ruleId;

  const highlightClass = (ruleId?: number) => {
    if (isPrint || ruleId === undefined) return '';
    const active = activeRuleHighlight === ruleId;
    return `transition-colors duration-150 rounded-[3px] ${
      onSelectRule ? 'cursor-pointer hover:bg-amber-100/70' : ''
    } ${active ? 'bg-amber-200/80 ring-1 ring-amber-600/40 px-1 -mx-0.5' : ''}`;
  };

  const renderMarker = (ruleId: number) => {
    if (!showRuleMarkers) return null;
    const active = !isPrint && activeRuleHighlight === ruleId;
    return (
      <span
        dir="ltr"
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-mono font-semibold tabular-nums align-middle mx-1 select-none transition-colors ${
          active ? 'bg-amber-600 text-white' : 'bg-blue-900 text-white'
        }`}
      >
        {ruleId}
      </span>
    );
  };

  return (
    <article
      dir="rtl"
      lang="ur"
      className={`relative w-full text-slate-900 border border-stone-300/90 ${
        showRuledLines ? 'exam-paper-ruled' : 'exam-paper-blank'
      } ${
        isPrint
          ? 'print-sheet-page px-10 py-10'
          : 'rounded-sm shadow-[0_1px_3px_rgba(28,25,23,0.06),0_12px_32px_rgba(28,25,23,0.06)] px-8 sm:px-14 md:px-16 py-10 sm:py-12'
      }`}
    >
      {/* Classic vertical exam margin line on the right (RTL reading edge) */}
      <div
        aria-hidden="true"
        className="exam-margin-line pointer-events-none absolute top-0 bottom-0 right-6 sm:right-9 w-px bg-rose-400/40"
      />
      <div
        aria-hidden="true"
        className="exam-margin-line pointer-events-none absolute top-0 bottom-0 right-[27px] sm:right-[39px] w-px bg-rose-400/20"
      />

      <div className="relative z-10 pr-3 sm:pr-4">
        {/* Top 3-Line Exam Heading */}
        <header className="text-center space-y-2 mb-6">
          <p className="urdu-nastaliq text-[18px] sm:text-[20px] font-semibold leading-[2.1] text-slate-900">
            {receipt.headingLines[0]}
          </p>
          <p className="urdu-nastaliq text-[18px] sm:text-[20px] font-semibold leading-[2.1] text-slate-900">
            {receipt.headingLines[1]}
          </p>
          <h2 className="urdu-nastaliq text-[21px] sm:text-[23px] font-bold leading-[2.2] text-slate-950">
            {receipt.headingLines[2]}
          </h2>
        </header>

        {/* Rule 1: Fixed Opening Phrase */}
        <div className="text-center mb-5">
          <span
            id="rule-anchor-1"
            onClick={() => !isPrint && onSelectRule?.(1)}
            className={`urdu-nastaliq inline-flex items-center gap-1 text-[20px] sm:text-[22px] font-semibold leading-[2.2] text-slate-950 ${highlightClass(
              1
            )}`}
          >
            <span>{receipt.openingPhrase}</span>
            {renderMarker(1)}
          </span>
        </div>

        {/* Rules 2–10: Single Continuous Sentence (No paragraph breaks inside body) */}
        <p className="urdu-nastaliq text-right text-[18px] sm:text-[19.5px] leading-[2.55] text-slate-900 mb-10 text-justify">
          {receipt.bodySegments.map((segment, idx) => {
            const displayText = segment.terminologyVariant
              ? receipt4Variant === 'video'
                ? segment.terminologyVariant.video
                : segment.terminologyVariant.book
              : segment.text;

            const isVariantTerm = Boolean(segment.terminologyVariant);

            return (
              <span
                key={idx}
                id={segment.ruleId ? `rule-anchor-${segment.ruleId}-${idx}` : undefined}
                data-rule-id={segment.ruleId}
                onClick={() => {
                  if (!isPrint && segment.ruleId) {
                    onSelectRule?.(segment.ruleId);
                  }
                }}
                className={`${segment.isAmountDigits ? 'urdu-digits font-semibold mx-0.5' : ''} ${
                  isVariantTerm && !isPrint
                    ? 'underline decoration-blue-700 decoration-2 underline-offset-8 font-bold text-blue-950'
                    : ''
                } ${highlightClass(segment.ruleId)}`}
              >
                {displayText}
                {segment.markerRuleId !== undefined && renderMarker(segment.markerRuleId)}
              </span>
            );
          })}
        </p>

        {/* Rules 11, 12, 13: 3-Column Bottom Layout (Right: گواہ شد | Center: العبد | Left: گواہ شد) */}
        <section
          aria-label="Witnesses and Scribe"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-start pt-2"
        >
          {/* Column 1 (Right in RTL): Right Witness (Rule 11) */}
          <div
            id="rule-anchor-11"
            onClick={() => !isPrint && onSelectRule?.(11)}
            className={`text-right space-y-1 p-2 -m-2 ${highlightClass(11)}`}
          >
            <h3 className="urdu-nastaliq flex items-center gap-1 text-[18px] font-bold leading-[2.1] text-slate-950 mb-1">
              <span>{receipt.rightWitness.heading}</span>
              {renderMarker(11)}
            </h3>
            <p className="urdu-nastaliq text-[15.5px] leading-[2.2] text-slate-900">
              {receipt.rightWitness.name}
            </p>
            {receipt.rightWitness.lines.map((line, i) => (
              <p key={i} className="urdu-nastaliq text-[14.5px] leading-[2.15] text-slate-800">
                {line}
              </p>
            ))}
            <p className="urdu-nastaliq text-[14px] leading-[2.15] text-slate-800">
              شناختی کارڈ نمبر:{' '}
              <span className="urdu-digits" dir="ltr">
                {receipt.rightWitness.cnic.replace('شناختی کارڈ نمبر: ', '')}
              </span>
            </p>
            <p className="urdu-nastaliq text-[15px] leading-[2.2] text-slate-900 pt-1">
              {receipt.rightWitness.signatureLabel}
            </p>
          </div>

          {/* Column 2 (Center in RTL): Scribe / العبد (Rule 12) */}
          <div
            id="rule-anchor-12"
            onClick={() => !isPrint && onSelectRule?.(12)}
            className={`text-center space-y-1 p-2 -m-2 ${highlightClass(12)}`}
          >
            <h3 className="urdu-nastaliq inline-flex items-center justify-center gap-1 text-[18px] font-bold leading-[2.1] text-slate-950 mb-1">
              <span>{receipt.scribe.heading}</span>
              {renderMarker(12)}
            </h3>
            <p className="urdu-nastaliq text-[15.5px] leading-[2.2] text-slate-900">
              {receipt.scribe.name}
            </p>
            {receipt.scribe.lines.map((line, i) => (
              <p key={i} className="urdu-nastaliq text-[14.5px] leading-[2.15] text-slate-800">
                {line}
              </p>
            ))}
            <p className="urdu-nastaliq text-[14px] leading-[2.15] text-slate-800">
              شناختی کارڈ نمبر:{' '}
              <span className="urdu-digits" dir="ltr">
                {receipt.scribe.cnic.replace('شناختی کارڈ نمبر: ', '')}
              </span>
            </p>
            <p className="urdu-nastaliq text-[15px] leading-[2.2] text-slate-900 pt-1">
              {receipt.scribe.signatureLabel}
            </p>
          </div>

          {/* Column 3 (Left in RTL): Left Witness (Rule 13) */}
          <div
            id="rule-anchor-13"
            onClick={() => !isPrint && onSelectRule?.(13)}
            className={`text-right space-y-1 p-2 -m-2 ${highlightClass(13)}`}
          >
            <h3 className="urdu-nastaliq flex items-center gap-1 text-[18px] font-bold leading-[2.1] text-slate-950 mb-1">
              <span>{receipt.leftWitness.heading}</span>
              {renderMarker(13)}
            </h3>
            <p className="urdu-nastaliq text-[15.5px] leading-[2.2] text-slate-900">
              {receipt.leftWitness.name}
            </p>
            {receipt.leftWitness.lines.map((line, i) => (
              <p key={i} className="urdu-nastaliq text-[14.5px] leading-[2.15] text-slate-800">
                {line}
              </p>
            ))}
            <p className="urdu-nastaliq text-[14px] leading-[2.15] text-slate-800">
              شناختی کارڈ نمبر:{' '}
              <span className="urdu-digits" dir="ltr">
                {receipt.leftWitness.cnic.replace('شناختی کارڈ نمبر: ', '')}
              </span>
            </p>
            <p className="urdu-nastaliq text-[15px] leading-[2.2] text-slate-900 pt-1">
              {receipt.leftWitness.signatureLabel}
            </p>
          </div>
        </section>

        {/* Bottom Row: Rule 14 (Tahreer centered under العبد) + Rule 15 (Raseedi Ticket in bottom-left corner) */}
        <footer className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-end mt-6 pt-2">
          {/* Empty right spacer on desktop to keep Tahreer centered under العبد */}
          <div className="hidden sm:block" />

          {/* Rule 14: Tahreer centered under العبد */}
          <div className="text-center self-center">
            <span
              id="rule-anchor-14"
              onClick={() => !isPrint && onSelectRule?.(14)}
              className={`urdu-nastaliq inline-flex items-center justify-center gap-1 text-[16px] sm:text-[17px] font-semibold leading-[2.2] text-slate-950 px-2 ${highlightClass(
                14
              )}`}
            >
              <span>{receipt.tahreerDate}</span>
              {renderMarker(14)}
            </span>
          </div>

          {/* Rule 15: Raseedi Ticket in bottom-left corner (Column 3 in RTL) */}
          <div className="flex justify-end sm:justify-center pt-2">
            <RaseediTicketStamp
              highlighted={isHighlighted(15)}
              onSelectRule={isPrint ? undefined : onSelectRule}
              showMarker={showRuleMarkers}
            />
          </div>
        </footer>
      </div>
    </article>
  );
};
