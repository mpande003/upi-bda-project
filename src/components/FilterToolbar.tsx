import React from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';

interface FilterToolbarProps {
  startYear: string;
  setStartYear: (yr: string) => void;
  endYear: string;
  setEndYear: (yr: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  includePartialYear: boolean;
  setIncludePartialYear: (inc: boolean) => void;
  yearOptions: string[];
  onReset: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  searchQuery,
  setSearchQuery,
  includePartialYear,
  setIncludePartialYear,
  yearOptions,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Left Filter Section */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider shrink-0">
          <Filter className="w-4 h-4 text-slate-500" />
          Filter Dataset:
        </div>

        {/* Start Year Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="start-year" className="text-slate-500 font-medium">From:</label>
          <select
            id="start-year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            {yearOptions.map((yr) => (
              <option key={yr} value={yr}>FY {yr}</option>
            ))}
          </select>
        </div>

        {/* End Year Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="end-year" className="text-slate-500 font-medium">To:</label>
          <select
            id="end-year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            {yearOptions.map((yr) => (
              <option key={yr} value={yr}>FY {yr}</option>
            ))}
          </select>
        </div>

        {/* Toggle Partial Year */}
        <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium text-slate-700 hover:bg-slate-100 transition-colors">
          <input
            type="checkbox"
            checked={includePartialYear}
            onChange={(e) => setIncludePartialYear(e.target.checked)}
            className="rounded-xs border-slate-300 text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
          />
          <span>Include FY 2026-27 (6-Month Partial)</span>
        </label>
      </div>

      {/* Right Search & Reset */}
      <div className="flex items-center gap-2 text-xs">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search year or bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-44"
          />
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors font-medium"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
