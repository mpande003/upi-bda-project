import React from 'react';
import { ShieldCheck, Download, BarChart2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenValidation: () => void;
  onExportCsv: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenValidation,
  onExportCsv,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'annual-trends', label: 'Annual Trends' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'growth-dynamics', label: 'Growth' },
    { id: 'completeness', label: 'Completeness' },
    { id: 'insights', label: 'Insights' },
    { id: 'dataset-table', label: 'Data Grid' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Text Element Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-base shadow-xs">
              <BarChart2 className="w-5 h-5 text-sky-400" />
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
              className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors"
            >
              NPCI UPI Annual Analytics
            </a>
          </div>

          {/* Zone 2: Concise Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-4 text-xs font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeTab === item.id
                    ? 'bg-slate-100 text-slate-900 font-semibold shadow-2xs'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenValidation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap shrink-0"
              title="Run Mathematical & Integrity Validation Suite"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Validation Report</span>
            </button>
            <button
              onClick={onExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0"
              title="Export Full Dataset CSV"
            >
              <Download className="w-3.5 h-3.5 shrink-0 text-sky-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
