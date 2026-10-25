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
import { formatNumber, formatPercent } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart1VolumeTrend: React.FC<Props> = ({ data }) => {
  const [unit, setUnit] = useState<'Mn' | 'Billion'>('Mn');

  const formattedData = data.map(d => ({
    ...d,
    displayVolume: unit === 'Billion' ? d.annualVolumeMn / 1000 : d.annualVolumeMn,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record: NPCIDerivedRecord = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800 space-y-1">
          <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>FY {label}</span>
            <span className="text-slate-400">({record.monthsCount} Months)</span>
          </div>
          <div className="text-emerald-400 font-mono font-semibold">
            Volume: {formatNumber(record.annualVolumeMn, 2)} Mn ({formatNumber(record.annualVolumeBillion, 2)} Billion)
          </div>
          <div className="text-slate-300">
            YoY Growth: {formatPercent(record.volumeGrowthPct)}
          </div>
          {record.isPartialYear && (
            <div className="text-amber-400 text-[11px] font-medium pt-1">
              ⚠️ Partial Year (6 months reported)
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Chart Unit Selector & Toolbar */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Metric: Annual Transaction Volume</span>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => setUnit('Mn')}
            className={`px-2.5 py-1 rounded-sm transition-colors font-medium ${
              unit === 'Mn' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Millions (Mn)
          </button>
          <button
            onClick={() => setUnit('Billion')}
            className={`px-2.5 py-1 rounded-sm transition-colors font-medium ${
              unit === 'Billion' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Billions (B)
          </button>
        </div>
      </div>

      {/* Recharts Line Container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="financialYear"
              stroke="#64748B"
              fontSize={11}
              tickMargin={8}
              label={{ value: 'Financial Year', position: 'insideBottom', offset: -15, fill: '#64748B', fontSize: 11 }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickFormatter={(val) => (unit === 'Billion' ? `${val}B` : `${val.toLocaleString()}M`)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
            
            {/* Growth Phase Dividers */}
            <ReferenceLine x="2020-21" stroke="#94A3B8" strokeDasharray="3 3" label={{ value: 'COVID Surge', position: 'top', fill: '#64748B', fontSize: 10 }} />
            <ReferenceLine x="2026-27" stroke="#F59E0B" strokeDasharray="3 3" label={{ value: '6-Mo Data', position: 'top', fill: '#D97706', fontSize: 10 }} />

            <Line
              type="monotone"
              dataKey="displayVolume"
              name={`Annual Volume (${unit})`}
              stroke="#0EA5E9"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0284C7', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, fill: '#0369A1' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
