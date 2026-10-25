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
import { formatCurrencyCr, formatNumber, formatPercent } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart2ValueTrend: React.FC<Props> = ({ data }) => {
  const [unit, setUnit] = useState<'Cr' | 'LakhCr'>('Cr');

  const formattedData = data.map(d => ({
    ...d,
    displayValue: unit === 'LakhCr' ? d.annualValueCr / 100000 : d.annualValueCr,
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
          <div className="text-indigo-400 font-mono font-semibold">
            Value: {formatCurrencyCr(record.annualValueCr)}
          </div>
          <div className="text-slate-300">
            YoY Value Growth: {formatPercent(record.calculatedValueGrowthPct)}
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
      {/* Unit Selector */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Metric: Annual Transaction Value</span>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => setUnit('Cr')}
            className={`px-2.5 py-1 rounded-sm transition-colors font-medium ${
              unit === 'Cr' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Crores (₹ Cr)
          </button>
          <button
            onClick={() => setUnit('LakhCr')}
            className={`px-2.5 py-1 rounded-sm transition-colors font-medium ${
              unit === 'LakhCr' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lakh Crores (₹ Lakh Cr)
          </button>
        </div>
      </div>

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
              tickFormatter={(val) => (unit === 'LakhCr' ? `₹${val.toFixed(1)}L Cr` : `₹${(val / 1000).toFixed(0)}k Cr`)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

            <ReferenceLine x="2017-18" stroke="#10B981" strokeDasharray="3 3" label={{ value: 'Max % Increase (+1480%)', position: 'top', fill: '#059669', fontSize: 10 }} />
            <ReferenceLine x="2023-24" stroke="#6366F1" strokeDasharray="3 3" label={{ value: 'Max Abs Surge (+₹6.07L Cr)', position: 'top', fill: '#4F46E5', fontSize: 10 }} />

            <Line
              type="monotone"
              dataKey="displayValue"
              name={`Annual Value (${unit === 'LakhCr' ? '₹ Lakh Cr' : '₹ Cr'})`}
              stroke="#6366F1"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, fill: '#3730A3' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
