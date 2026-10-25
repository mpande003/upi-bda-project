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
  Cell,
  ReferenceLine,
} from 'recharts';
import { NPCIDerivedRecord } from '../../types/npci';
import { formatNumber, formatPercent } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart3VolumeGrowth: React.FC<Props> = ({ data }) => {
  const [showLogScale, setShowLogScale] = useState(false);

  // Filter out first observation (2016-17) which has no previous year for YoY
  const growthData = data.slice(1).map(d => ({
    ...d,
    reportedGrowth: d.volumeGrowthPct ?? 0,
    calculatedGrowth: d.calculatedVolumeGrowthPct ?? 0,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record: any = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800 space-y-1">
          <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>FY {label}</span>
            <span className="text-slate-400">({record.monthsCount} Months)</span>
          </div>
          <div className="text-sky-400 font-mono">
            Reported Volume Growth: {formatPercent(record.reportedGrowth)}
          </div>
          <div className="text-emerald-400 font-mono">
            Calculated YoY Growth: {formatPercent(record.calculatedGrowth)}
          </div>
          {record.isPartialYear && (
            <div className="text-amber-300 text-[11px] pt-1 border-t border-slate-800">
              Note: FY26-27 is a 6-month period. Raw total drop is -41.80%, but monthly average volume grew +16.3% vs FY25-26.
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Metric: Year-over-Year Volume Growth (%)</span>
        <button
          onClick={() => setShowLogScale(!showLogScale)}
          className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium border border-slate-200 transition-colors"
        >
          {showLogScale ? 'Linear Axis (FY17 spike visible)' : 'Focus Recent Years (Cap Max Bar)'}
        </button>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={growthData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="financialYear"
              stroke="#64748B"
              fontSize={11}
              tickMargin={8}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              domain={showLogScale ? [-50, 600] : [-50, 5200]}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
            <ReferenceLine y={0} stroke="#475569" strokeWidth={1.5} />

            <Bar dataKey="calculatedGrowth" name="Calculated YoY Volume Growth (%)" radius={[4, 4, 0, 0]}>
              {growthData.map((entry, index) => {
                let fill = '#0EA5E9'; // default blue
                if (entry.financialYear === '2017-18') fill = '#10B981'; // max growth emerald
                if (entry.financialYear === '2025-26') fill = '#6366F1'; // lowest full year indigo
                if (entry.isPartialYear) fill = '#F59E0B'; // partial year amber
                return <Cell key={`cell-${index}`} fill={fill} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-[#10B981]" /> Max Growth (FY17-18: +5,024.4%)</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-[#6366F1]" /> Lowest Full-Year Growth (FY25-26: +30.0%)</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-[#F59E0B]" /> 6-Month Partial Year (FY26-27: -41.8% raw)</div>
      </div>
    </div>
  );
};
