import React from 'react';
import { HelpCircle, Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AnalysisCardProps {
  number: number;
  title: string;
  category: string;
  question: string;
  children: React.ReactNode;
  statHighlights?: { label: string; value: string; subtext?: string }[];
  observations: string[];
  significance: string;
  caveats: string;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  number,
  title,
  category,
  question,
  children,
  statHighlights,
  observations,
  significance,
  caveats,
}) => {
  return (
    <div id={`analysis-${number}`} className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300">
      {/* Top Header Strip */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-mono text-sm font-semibold shrink-0">
            {number.toString().padStart(2, '0')}
          </span>
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{category}</div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-6">
        {/* Analytical Question Box */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3.5 flex items-start gap-3 text-slate-700 text-sm">
          <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900">Analytical Question: </span>
            {question}
          </div>
        </div>

        {/* Dynamic Key Metric Highlights (if provided) */}
        {statHighlights && statHighlights.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {statHighlights.map((stat, i) => (
              <div key={i} className="p-3 bg-slate-50/80 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-500 font-medium truncate">{stat.label}</div>
                <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-0.5">{stat.value}</div>
                {stat.subtext && <div className="text-[11px] text-slate-500 mt-0.5">{stat.subtext}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Chart Visualization Area */}
        <div className="bg-slate-50/30 rounded-lg border border-slate-100 p-4">
          {children}
        </div>

        {/* Observations, Significance & Caveats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          {/* Data-Supported Observations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              Calculated Observations
            </div>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              {observations.map((obs, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytical Significance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Analytical Significance
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {significance}
            </p>
          </div>

          {/* Limitations & Caveats */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              Limitations &amp; Caveats
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {caveats}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
