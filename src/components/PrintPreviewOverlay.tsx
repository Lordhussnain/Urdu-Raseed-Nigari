import React, { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import { ReceiptItem } from '../data/receiptsData';
import { ExamReceiptSheet } from './ExamReceiptSheet';

export type PrintScope = 'current' | 'all' | 'packet';

interface PrintPreviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  blueprint: ReceiptItem;
  receipts: ReceiptItem[];
  activeReceiptId: number;
  printScope: PrintScope;
  onChangePrintScope: (scope: PrintScope) => void;
  showRuledLines: boolean;
  onToggleRuledLines: () => void;
  showBlueprintMarkers: boolean;
  onToggleBlueprintMarkers: () => void;
  receipt4Variant: 'video' | 'book';
}

export const PrintPreviewOverlay: React.FC<PrintPreviewOverlayProps> = ({
  isOpen,
  onClose,
  blueprint,
  receipts,
  activeReceiptId,
  printScope,
  onChangePrintScope,
  showRuledLines,
  onToggleRuledLines,
  showBlueprintMarkers,
  onToggleBlueprintMarkers,
  receipt4Variant,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = [blueprint, ...receipts];

  const sheetsToRender =
    printScope === 'packet'
      ? allItems
      : printScope === 'all'
        ? receipts
        : allItems.filter((r) => r.id === activeReceiptId);

  const includesBlueprint = sheetsToRender.some((s) => s.id === 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="A4 Print Preview"
      className="fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-xs overflow-y-auto print-only-container"
    >
      {/* Print Preview Top Control Bar (Hidden during actual print) */}
      <div className="no-print sticky top-0 z-20 bg-[#FAF8F3] border-b border-stone-300 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1160px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
              A4 Exam Sheet Print Preview
            </h2>
            <p className="text-xs text-stone-500 tabular-nums">
              {sheetsToRender.length === 1
                ? sheetsToRender[0].id === 0
                  ? 'Printing Master Format Blueprint · 1 A4 page'
                  : `Printing Receipt 0${sheetsToRender[0].id} · 1 A4 page`
                : `Printing ${sheetsToRender.length} sheets · ${sheetsToRender.length} separate A4 pages`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Scope Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg">
              <button
                type="button"
                onClick={() => onChangePrintScope('current')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  printScope === 'current'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Current Sheet
              </button>
              <button
                type="button"
                onClick={() => onChangePrintScope('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  printScope === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All 6 Receipts
              </button>
              <button
                type="button"
                onClick={() => onChangePrintScope('packet')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  printScope === 'packet'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Blueprint + All 6
              </button>
            </div>

            {includesBlueprint && (
              <button
                type="button"
                onClick={onToggleBlueprintMarkers}
                aria-pressed={showBlueprintMarkers}
                className="px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {showBlueprintMarkers ? 'Markers: 1–15' : 'Markers: Hidden'}
              </button>
            )}

            {/* Ruled Lines Toggle */}
            <button
              type="button"
              onClick={onToggleRuledLines}
              aria-pressed={showRuledLines}
              className="px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showRuledLines ? 'Paper: Ruled Lines' : 'Paper: Plain Blank'}
            </button>

            {/* Trigger Browser Print */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              Print A4
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close print preview"
              className="inline-flex items-center justify-center p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Paper Stack */}
      <div className="py-8 px-4 sm:px-6 space-y-8 print:p-0 print:space-y-0">
        {sheetsToRender.map((receipt) => (
          <div
            key={receipt.id}
            className="max-w-[210mm] mx-auto bg-white shadow-2xl print:max-w-none print:shadow-none"
          >
            <ExamReceiptSheet
              receipt={receipt}
              receipt4Variant={receipt4Variant}
              showRuledLines={showRuledLines}
              showRuleMarkers={receipt.id === 0 && showBlueprintMarkers}
              isPrint={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
