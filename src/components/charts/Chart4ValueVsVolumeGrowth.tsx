import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { NPCIDerivedRecord } from '../../types/npci';
import { formatPercent } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart4ValueVsVolumeGrowth: React.FC<Props> = ({ data }) => {
  const [zoomRecent, setZoomRecent] = useState(true);

  // Exclude FY16-17 (no prev year)
  const comparisonData = data.slice(1).map(d => ({
    financialYear: d.financialYear,
    volGrowth: d.calculatedVolumeGrowthPct ?? 0,
    valGrowth: d.calculatedValueGrowthPct ?? 0,
    isValueDominant: (d.calculatedValueGrowthPct ?? 0) > (d.calculatedVolumeGrowthPct ?? 0),
    isPartialYear: d.isPartialYear,
    monthsCount: d.monthsCount,
  }));

  const filteredData = zoomRecent ? comparisonData.slice(1) : comparisonData; // Exclude FY17-18 outlier (+5024%) in zoomed view

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800 space-y-1.5">
          <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>FY {label}</span>
            <span className="text-slate-400">({record.monthsCount} Months)</span>
          </div>
          <div className="text-sky-400 font-mono flex justify-between gap-4">
            <span>Volume Growth:</span>
            <span className="font-bold">{formatPercent(record.volGrowth)}</span>
          </div>
          <div className="text-indigo-400 font-mono flex justify-between gap-4">
            <span>Value Growth:</span>
            <span className="font-bold">{formatPercent(record.valGrowth)}</span>
          </div>
          <div className="text-amber-300 text-[11px] font-medium pt-1 border-t border-slate-800">
            {record.isValueDominant
              ? '💡 Value Growth > Volume Growth (Ticket size increased)'
              : '💡 Volume Growth > Value Growth (Ticket size contracted / micro-payments grew)'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Comparison: Volume Growth vs Value Growth (%)</span>
        <button
          onClick={() => setZoomRecent(!zoomRecent)}
          className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium border border-slate-200 transition-colors"
        >
          {zoomRecent ? 'Show All Years (Inc. FY17-18 Outlier)' : 'Zoom Recent Years (FY19 to FY27)'}
        </button>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="financialYear" stroke="#64748B" fontSize={11} tickMargin={8} />
            <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `${val}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
            <ReferenceLine y={0} stroke="#475569" strokeWidth={1.5} />

            <Bar dataKey="volGrowth" name="Volume Growth (%)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="valGrowth" name="Value Growth (%)" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
