import React, { useState, useMemo } from 'react';
import { PHONEPE_AGG_TRANS_DATA } from '../../data/phonepeAggTransDataset';
import { formatCurrencyCr, formatInr, formatNumber } from '../../utils/statistics';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Layers, MapPin, DollarSign, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react';

const COLORS = ['#6366F1', '#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6'];

export const PhonePeAggTransView: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('1');

  const states = useMemo(() => ['All', ...Array.from(new Set(PHONEPE_AGG_TRANS_DATA.map(d => d.state)))], []);

  const filteredData = useMemo(() => {
    if (selectedState === 'All') return PHONEPE_AGG_TRANS_DATA;
    return PHONEPE_AGG_TRANS_DATA.filter(d => d.state === selectedState);
  }, [selectedState]);

  const typeAgg = useMemo(() => {
    const map = new Map<string, { count: number; amount: number }>();
    filteredData.forEach(d => {
      const existing = map.get(d.transactionType) || { count: 0, amount: 0 };
      map.set(d.transactionType, {
        count: existing.count + d.transactionCount,
        amount: existing.amount + d.transactionAmount,
      });
    });

    return Array.from(map.entries()).map(([type, val]) => ({
      transactionType: type,
      countMn: val.count / 1000000,
      amountCr: val.amount / 10000000,
      avgTxInr: val.count > 0 ? val.amount / val.count : 0,
    }));
  }, [filteredData]);

  const totalCountMn = useMemo(() => filteredData.reduce((acc, d) => acc + d.transactionCount, 0) / 1000000, [filteredData]);
  const totalAmountCr = useMemo(() => filteredData.reduce((acc, d) => acc + d.transactionAmount, 0) / 10000000, [filteredData]);

  const analysisOptions = [
    { id: '1', title: 'Analysis 1: Transaction Volume by Payment Type' },
    { id: '2', title: 'Analysis 2: Transaction Amount Share (%)' },
    { id: '3', title: 'Analysis 3: Detailed Type Metrics & Ticket Size Table' },
    { id: 'all', title: 'View All Analyses (Stacked)' },
  ];

  const numericAnalysisIds = ['1', '2', '3'];

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
                Agg_Trans.csv
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                PhonePe Pulse — Aggregated Transactions Analysis
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Transaction counts, amounts, type breakdowns, quarterly trends, and state-level comparisons.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="phonepe-state-filter" className="text-xs font-medium text-slate-500">State Filter:</label>
            <select
              id="phonepe-state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-hidden"
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Executive KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <div className="text-xs font-semibold text-indigo-800 uppercase">Total Transaction Count</div>
            <div className="text-lg font-bold font-mono tabular-nums text-indigo-950 mt-1">
              {formatNumber(totalCountMn, 2)} Mn
            </div>
            <div className="text-[11px] text-indigo-700 mt-0.5">Filter State: {selectedState}</div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <div className="text-xs font-semibold text-emerald-800 uppercase">Total Transaction Amount</div>
            <div className="text-lg font-bold font-mono tabular-nums text-emerald-950 mt-1">
              {formatCurrencyCr(totalAmountCr)}
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5">₹{(totalAmountCr / 100000).toFixed(2)} Lakh Crore</div>
          </div>

          <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-100">
            <div className="text-xs font-semibold text-sky-800 uppercase">Overall Avg Transaction Value</div>
            <div className="text-lg font-bold font-mono tabular-nums text-sky-950 mt-1">
              {formatInr(totalCountMn > 0 ? (totalAmountCr * 10000000) / (totalCountMn * 1000000) : 0)}
            </div>
            <div className="text-[11px] text-sky-700 mt-0.5">Across all transaction types</div>
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
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">1. Transaction Count by Payment Type (Mn)</h2>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeAgg} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="transactionType" stroke="#64748B" fontSize={11} interval={0} tickFormatter={(t) => t.split(' ')[0]} />
                  <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `${val}M`} />
                  <Tooltip formatter={(val: any) => [`${formatNumber(Number(val), 2)} Mn`, 'Count']} />
                  <Bar dataKey="countMn" name="Count (Mn)" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '2' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">2. Transaction Amount Share (%)</h2>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeAgg}
                    dataKey="amountCr"
                    nameKey="transactionType"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }) => `${(name || '').split(' ')[0]}: ${formatCurrencyCr(Number(value))}`}
                  >
                    {typeAgg.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [formatCurrencyCr(Number(val)), 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '3' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">3. Transaction Type Detailed Metrics</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Transaction Type</th>
                    <th className="py-2.5 px-3 text-right">Transaction Count (Mn)</th>
                    <th className="py-2.5 px-3 text-right">Transaction Amount (Cr)</th>
                    <th className="py-2.5 px-3 text-right">Volume Share (%)</th>
                    <th className="py-2.5 px-3 text-right">Avg Ticket Size (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {typeAgg.map((row) => (
                    <tr key={row.transactionType} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{row.transactionType}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-indigo-700 font-semibold">{formatNumber(row.countMn, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-semibold">{formatCurrencyCr(row.amountCr)}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{((row.countMn / totalCountMn) * 100).toFixed(1)}%</td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">{formatInr(row.avgTxInr)}</td>
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
