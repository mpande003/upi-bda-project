import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

export const Chart9GrowthDynamics: React.FC<Props> = ({ data }) => {
  const [excludeFY18, setExcludeFY18] = useState(true);

  // Filter out FY16-17 (no growth)
  const growthData = data.slice(1).map(d => ({
    financialYear: d.financialYear,
    volGrowth: d.calculatedVolumeGrowthPct ?? 0,
    ticketGrowth: d.ticketSizeYoYChangePct ?? 0,
    monthsCount: d.monthsCount,
  }));

  const chartData = excludeFY18 ? growthData.slice(1) : growthData; // Exclude FY17-18 +5024% outlier for visual clarity

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
            <span>Volume Growth Rate:</span>
            <span className="font-bold">{formatPercent(record.volGrowth)}</span>
          </div>
          <div className="text-amber-400 font-mono flex justify-between gap-4">
            <span>Ticket Size Growth Rate:</span>
            <span className="font-bold">{formatPercent(record.ticketGrowth)}</span>
          </div>
          <div className="text-slate-300 text-[11px] pt-1 border-t border-slate-800">
            {record.ticketGrowth < 0
              ? '📉 Ticket size contracted as volume expanded (micro QR payment adoption)'
              : '📈 Ticket size grew alongside volume expansion'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Metric: Volume Growth Rate (%) vs Ticket Size Growth Rate (%)</span>
        <button
          onClick={() => setExcludeFY18(!excludeFY18)}
          className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium border border-slate-200 transition-colors"
        >
          {excludeFY18 ? 'Include FY17-18 Outlier (+5024%)' : 'Focus Recent Period (FY19 - FY27)'}
        </button>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="financialYear" stroke="#64748B" fontSize={11} tickMargin={8} />
            <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `${val}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
            <ReferenceLine y={0} stroke="#475569" strokeWidth={1.5} />

            <Line
              type="monotone"
              dataKey="volGrowth"
              name="Volume Growth Rate (%)"
              stroke="#0EA5E9"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0284C7' }}
            />
            <Line
              type="monotone"
              dataKey="ticketGrowth"
              name="Ticket Size Growth Rate (%)"
              stroke="#F59E0B"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#D97706' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
