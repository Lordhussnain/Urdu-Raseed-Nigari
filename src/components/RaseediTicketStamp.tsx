import React from 'react';

interface RaseediTicketStampProps {
  highlighted?: boolean;
  onSelectRule?: (ruleId: number) => void;
  showMarker?: boolean;
}

export const RaseediTicketStamp: React.FC<RaseediTicketStampProps> = ({
  highlighted = false,
  onSelectRule,
  showMarker = false,
}) => {
  return (
    <div
      id="rule-anchor-15"
      onClick={() => onSelectRule?.(15)}
      role={onSelectRule ? 'button' : undefined}
      tabIndex={onSelectRule ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelectRule && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelectRule(15);
        }
      }}
      title={onSelectRule ? 'Rule 15: Raseedi Ticket Stamp' : undefined}
      className={`inline-flex flex-col items-center select-none transition-colors duration-150 ${
        onSelectRule ? 'cursor-pointer rounded-md p-2 -m-2' : ''
      } ${highlighted ? 'bg-amber-200/60 ring-1 ring-amber-600/50' : ''}`}
    >
      {/* Square box with diagonal cross extending half inside and half outside */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg
          viewBox="0 0 80 80"
          className="w-16 h-16 overflow-visible"
          aria-label="Raseedi Ticket stamp box with cross extending outside"
        >
          {/* Inner square stamp box */}
          <rect
            x="16"
            y="16"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="text-slate-800"
          />
          {/* Diagonal cross extending half inside and half outside the square */}
          <line
            x1="4"
            y1="4"
            x2="76"
            y2="76"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="text-slate-800"
          />
          <line
            x1="76"
            y1="4"
            x2="4"
            y2="76"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="text-slate-800"
          />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="urdu-nastaliq text-[15px] leading-relaxed font-semibold text-slate-900">
          (رسیدی ٹکٹ)
        </span>
        {showMarker && (
          <span
            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-mono font-semibold tabular-nums transition-colors ${
              highlighted ? 'bg-amber-600 text-white' : 'bg-blue-900 text-white'
            }`}
          >
            15
          </span>
        )}
      </div>
    </div>
  );
};
