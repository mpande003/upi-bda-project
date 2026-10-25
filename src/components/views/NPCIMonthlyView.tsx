import React, { useState } from 'react';
import { DERIVED_NPCI_MONTHLY_DATA } from '../../data/npciMonthlyDataset';
import { formatCurrencyCr, formatInr, formatNumber, formatPercent } from '../../utils/statistics';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { Calendar, TrendingUp, Layers, Zap, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react';

export const NPCIMonthlyView: React.FC = () => {
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('1');

  const filteredData = DERIVED_NPCI_MONTHLY_DATA.filter((d) => {
    if (selectedYearFilter === 'all') return true;
    return d.year.toString() === selectedYearFilter;
  });

  const latestMonth = DERIVED_NPCI_MONTHLY_DATA[DERIVED_NPCI_MONTHLY_DATA.length - 1];
  const totalVolume = DERIVED_NPCI_MONTHLY_DATA.reduce((acc, d) => acc + d.totalVolumeMn, 0);

  const analysisOptions = [
    { id: '1', title: 'Analysis 1: Monthly Total Volume and Value Trends' },
    { id: '2', title: 'Analysis 2: P2P vs P2M Volume Shares (%)' },
    { id: '3', title: 'Analysis 3: P2P vs P2M Value Shares (%)' },
    { id: '4', title: 'Analysis 4: Average Ticket Size Comparison (P2P vs P2M)' },
    { id: '5', title: 'Analysis 5: Monthly Seasonality & MoM Growth Data' },
    { id: 'all', title: 'View All Analyses (Stacked)' },
  ];

  const numericAnalysisIds = ['1', '2', '3', '4', '5'];

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
      {/* Overview Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Consolidated Monthly Ecosystem Statistics — P2P &amp; P2M
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Granular monthly trends, peer-to-peer (P2P) vs peer-to-merchant (P2M) volume shares, value shares, ticket sizes &amp; seasonality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Filter Year:</span>
            <select
              value={selectedYearFilter}
              onChange={(e) => setSelectedYearFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Years (2023 - 2026)</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-100">
            <div className="text-xs font-semibold text-sky-800 uppercase">Latest Monthly Volume ({latestMonth.monthYear})</div>
            <div className="text-lg font-bold font-mono tabular-nums text-sky-950 mt-1">
              {formatNumber(latestMonth.totalVolumeMn, 2)} Mn
            </div>
            <div className="text-[11px] text-sky-700 mt-0.5">
              P2M: {latestMonth.p2mVolumeSharePct.toFixed(1)}% | P2P: {latestMonth.p2pVolumeSharePct.toFixed(1)}%
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <div className="text-xs font-semibold text-indigo-800 uppercase">Latest Monthly Value ({latestMonth.monthYear})</div>
            <div className="text-lg font-bold font-mono tabular-nums text-indigo-950 mt-1">
              {formatCurrencyCr(latestMonth.totalValueCr)}
            </div>
            <div className="text-[11px] text-indigo-700 mt-0.5">
              P2P Value Share: {latestMonth.p2pValueSharePct.toFixed(1)}%
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <div className="text-xs font-semibold text-emerald-800 uppercase">P2P vs P2M Ticket Size</div>
            <div className="text-lg font-bold font-mono tabular-nums text-emerald-950 mt-1">
              {formatInr(latestMonth.avgTicketSizeP2PInr)} vs {formatInr(latestMonth.avgTicketSizeP2MInr)}
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5">
              P2P ticket size is ~{(latestMonth.avgTicketSizeP2PInr / latestMonth.avgTicketSizeP2MInr).toFixed(1)}x higher than P2M
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-slate-600 uppercase">Cumulative Monthly Span</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-1">
              {DERIVED_NPCI_MONTHLY_DATA.length} Months
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Total Volume: {formatNumber(totalVolume / 1000, 2)} B
            </div>
          </div>
        </div>
      </div>

      {/* Single Analysis Selection Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="p-2 bg-sky-50 rounded-lg text-sky-600 border border-sky-100">
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
            className="flex-1 md:w-80 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500 shadow-2xs"
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
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">1. Monthly Total Transaction Volume and Value Trends</h2>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="monthYear" stroke="#64748B" fontSize={11} tickMargin={8} />
                  <YAxis yAxisId="left" stroke="#0EA5E9" fontSize={11} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k M`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6366F1" fontSize={11} tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L Cr`} />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      String(name || '').includes('Volume') ? `${formatNumber(Number(val), 2)} Mn` : formatCurrencyCr(Number(val)),
                      String(name || ''),
                    ]}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

                  <Line yAxisId="left" type="monotone" dataKey="totalVolumeMn" name="Total Monthly Volume (Mn)" stroke="#0EA5E9" strokeWidth={2.5} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="totalValueCr" name="Total Monthly Value (Cr)" stroke="#6366F1" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '2' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">2. P2P vs P2M Volume Shares (%)</h2>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="monthYear" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(val: any) => `${Number(val).toFixed(2)}%`} />
                  <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: '11px' }} />

                  <Area type="monotone" dataKey="p2mVolumeSharePct" name="P2M Volume Share (%)" stackId="1" stroke="#0EA5E9" fill="#0EA5E9" />
                  <Area type="monotone" dataKey="p2pVolumeSharePct" name="P2P Volume Share (%)" stackId="1" stroke="#6366F1" fill="#6366F1" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '3' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">3. P2P vs P2M Value Shares (%)</h2>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="monthYear" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(val: any) => `${Number(val).toFixed(2)}%`} />
                  <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: '11px' }} />

                  <Area type="monotone" dataKey="p2pValueSharePct" name="P2P Value Share (%)" stackId="1" stroke="#6366F1" fill="#6366F1" />
                  <Area type="monotone" dataKey="p2mValueSharePct" name="P2M Value Share (%)" stackId="1" stroke="#10B981" fill="#10B981" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '4' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Zap className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">4. Average Ticket Size Comparison: P2P vs P2M (₹)</h2>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="monthYear" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip formatter={(val: any) => formatInr(Number(val))} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

                  <Bar dataKey="avgTicketSizeP2PInr" name="Avg P2P Ticket Size (₹)" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgTicketSizeP2MInr" name="Avg P2M Ticket Size (₹)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedAnalysis === '5' || selectedAnalysis === 'all') && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">5. Monthly Seasonality &amp; MoM Growth Heatmap Data</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Month-Year</th>
                    <th className="py-2.5 px-3 text-right">Total Vol (Mn)</th>
                    <th className="py-2.5 px-3 text-right">MoM Vol Growth</th>
                    <th className="py-2.5 px-3 text-right">Total Val (Cr)</th>
                    <th className="py-2.5 px-3 text-right">P2P Vol Share</th>
                    <th className="py-2.5 px-3 text-right">P2M Vol Share</th>
                    <th className="py-2.5 px-3 text-right">P2P Avg Ticket</th>
                    <th className="py-2.5 px-3 text-right">P2M Avg Ticket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.slice(-12).map((row) => (
                    <tr key={row.monthYear} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 font-mono font-semibold text-slate-900">{row.monthYear}</td>
                      <td className="py-2 px-3 text-right font-mono text-sky-700 font-semibold">{formatNumber(row.totalVolumeMn, 2)}</td>
                      <td className="py-2 px-3 text-right font-mono font-semibold">
                        <span className={row.momVolumeGrowthPct && row.momVolumeGrowthPct < 0 ? 'text-rose-600' : 'text-emerald-700'}>
                          {formatPercent(row.momVolumeGrowthPct)}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-indigo-700 font-semibold">{formatCurrencyCr(row.totalValueCr)}</td>
                      <td className="py-2 px-3 text-right font-mono">{row.p2pVolumeSharePct.toFixed(1)}%</td>
                      <td className="py-2 px-3 text-right font-mono text-sky-700 font-semibold">{row.p2mVolumeSharePct.toFixed(1)}%</td>
                      <td className="py-2 px-3 text-right font-mono">{formatInr(row.avgTicketSizeP2PInr)}</td>
                      <td className="py-2 px-3 text-right font-mono">{formatInr(row.avgTicketSizeP2MInr)}</td>
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
