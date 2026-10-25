import React, { useState, useMemo } from 'react';
import { PHONEPE_TOP_TRANS_DATA } from '../../data/phonepeTopTransDataset';
import { formatCurrencyCr, formatInr, formatNumber } from '../../utils/statistics';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Target, Hash, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react';

export const PhonePeTopTransView: React.FC = () => {
  const [selectedPincodeState, setSelectedPincodeState] = useState<string>('All');
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('1');

  const states = useMemo(() => ['All', ...Array.from(new Set(PHONEPE_TOP_TRANS_DATA.map(d => d.state)))], []);

  const filteredData = useMemo(() => {
    if (selectedPincodeState === 'All') return PHONEPE_TOP_TRANS_DATA;
    return PHONEPE_TOP_TRANS_DATA.filter(d => d.state === selectedPincodeState);
  }, [selectedPincodeState]);

  const topPincodes = useMemo(() => {
    return filteredData.map(d => ({
      pincode: d.pincode,
      district: d.district,
      state: d.state,
      pincodeCountMn: d.transPincodeCount / 1000000,
      pincodeAmountCr: d.transPincodeAmount / 10000000,
      avgTxInr: d.transPincodeCount > 0 ? d.transPincodeAmount / d.transPincodeCount : 0,
      districtSharePct: (d.transPincodeCount / d.transDistCount) * 100,
    })).sort((a, b) => b.pincodeCountMn - a.pincodeCountMn);
  }, [filteredData]);

  const analysisOptions = [
    { id: '1', title: 'Analysis 1: Top Hyper-Local Pincodes by Volume' },
    { id: '2', title: 'Analysis 2: Pincode vs Parent District Comparison Table' },
    { id: 'all', title: 'View All Analyses (Stacked)' },
  ];

  const numericAnalysisIds = ['1', '2'];

  const handlePrev = () => {
    const currentIdx = numericAnalysisIds.indexOf(selectedAnalysis);
    if (currentIdx > 0) {
      setSelectedAnalysis(numericAnalysisIds[currentIdx - 1]);
    } else {
      setSelectedAnalysis(numericAnalysisIds[numericAnalysisIds.length - 1]);
    }
  };

  const handleNext = () => {
    const currentIdx = numericAnalysisIds.indexOf(selectedAnalysis);
    if (currentIdx < numericAnalysisIds.length - 1 && currentIdx !== -1) {
      setSelectedAnalysis(numericAnalysisIds[currentIdx + 1]);
    } else {
      setSelectedAnalysis(numericAnalysisIds[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-200">
                Top_Trans.csv
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                PhonePe Pulse — Top Transactions Analysis
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Top districts and pincodes by transaction count and amount, pincode concentration, and district vs pincode level comparison.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="top-state-filter" className="text-xs font-medium text-slate-500">Filter State:</label>
            <select
              id="top-state-filter"
              value={selectedPincodeState}
              onChange={(e) => setSelectedPincodeState(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-hidden"
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <div className="text-xs font-semibold text-indigo-800 uppercase">Top Pincode by Volume</div>
            <div className="text-lg font-bold font-mono text-indigo-950 mt-1">
              PIN {topPincodes[0]?.pincode || 'N/A'}
            </div>
            <div className="text-[11px] text-indigo-700 mt-0.5">
              {topPincodes[0]?.district} ({topPincodes[0]?.state}) — {formatNumber(topPincodes[0]?.pincodeCountMn || 0, 2)} Mn
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <div className="text-xs font-semibold text-emerald-800 uppercase">Top Pincode by Value</div>
            <div className="text-lg font-bold font-mono text-emerald-950 mt-1">
              {formatCurrencyCr(topPincodes[0]?.pincodeAmountCr || 0)}
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5">
              PIN {topPincodes[0]?.pincode}
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-100">
            <div className="text-xs font-semibold text-amber-800 uppercase">Hyper-Local Pincodes Tracked</div>
            <div className="text-lg font-bold font-mono tabular-nums text-amber-950 mt-1">
              {topPincodes.length} Pincodes
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">Across {new Set(topPincodes.map(t => t.district)).size} Districts</div>
          </div>
        </div>
      </div>

      {/* Single Analysis Selection Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Single Analysis Selection</span>
            <span className="text-sm font-bold text-slate-900">
              {analysisOptions.find(a => a.id === selectedAnalysis)?.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition-colors shrink-0"
            title="Previous Analysis"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <select
            value={selectedAnalysis}
            onChange={(e) => setSelectedAnalysis(e.target.value)}
            className="flex-1 md:w-80 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
          >
            {analysisOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors shrink-0"
            title="Next Analysis"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RENDER ONLY SELECTED ANALYSIS */}
      <div className="space-y-6">
        {(selectedAnalysis === '1' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Hash className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">1. Top Hyper-Local Pincodes by Transaction Volume (Mn)</h2>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPincodes.slice(0, 10)} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="pincode" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `${val}M`} />
                  <Tooltip formatter={(val: any) => [`${formatNumber(Number(val), 2)} Mn`, 'Pincode Volume']} />
                  <Bar dataKey="pincodeCountMn" name="Pincode Volume (Mn)" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '2' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Target className="w-5 h-5 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">2. Pincode vs Parent District Transaction Activity</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Pincode</th>
                    <th className="py-2.5 px-3">District</th>
                    <th className="py-2.5 px-3">State</th>
                    <th className="py-2.5 px-3 text-right">Pincode Vol (Mn)</th>
                    <th className="py-2.5 px-3 text-right">Pincode Val (Cr)</th>
                    <th className="py-2.5 px-3 text-right">District Vol Share</th>
                    <th className="py-2.5 px-3 text-right">Avg Ticket Size (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topPincodes.map((row) => (
                    <tr key={`${row.pincode}-${row.district}`} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 font-mono font-bold text-indigo-700">PIN {row.pincode}</td>
                      <td className="py-2 px-3 font-semibold text-slate-900">{row.district}</td>
                      <td className="py-2 px-3 text-slate-600">{row.state}</td>
                      <td className="py-2 px-3 text-right font-mono text-indigo-700 font-semibold">{formatNumber(row.pincodeCountMn, 2)}</td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-700 font-semibold">{formatCurrencyCr(row.pincodeAmountCr)}</td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-sky-700">{row.districtSharePct.toFixed(1)}%</td>
                      <td className="py-2 px-3 text-right font-mono text-slate-800">{formatInr(row.avgTxInr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
