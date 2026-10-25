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
import { formatCurrencyCr, formatNumber } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart10Completeness: React.FC<Props> = ({ data }) => {
  const [metricMode, setMetricMode] = useState<'AnnualTotal' | 'MonthlyAverage'>('MonthlyAverage');

  const chartData = data.map(d => ({
    ...d,
    displayVol: metricMode === 'MonthlyAverage' ? d.monthlyAvgVolumeMn : d.annualVolumeMn,
    displayValCr: metricMode === 'MonthlyAverage' ? d.monthlyAvgValueCr : d.annualValueCr,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record: NPCIDerivedRecord = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800 space-y-1.5">
          <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>FY {label}</span>
            <span className={record.isPartialYear ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
              {record.monthsCount} Months ({record.isPartialYear ? 'Partial Year' : 'Full Year'})
            </span>
          </div>
          <div className="text-sky-400 font-mono flex justify-between gap-4">
            <span>Annual Volume Total:</span>
            <span>{formatNumber(record.annualVolumeMn, 2)} Mn</span>
          </div>
          <div className="text-emerald-400 font-mono flex justify-between gap-4">
            <span>Monthly Avg Volume Run-Rate:</span>
            <span className="font-bold">{formatNumber(record.monthlyAvgVolumeMn, 2)} Mn / mo</span>
          </div>
          <div className="text-indigo-400 font-mono flex justify-between gap-4">
            <span>Monthly Avg Value Run-Rate:</span>
            <span className="font-bold">{formatCurrencyCr(record.monthlyAvgValueCr)} / mo</span>
          </div>
          {record.isPartialYear && (
            <div className="text-amber-300 text-[11px] pt-1.5 border-t border-slate-800">
              💡 FY26-27 monthly volume (23,416.75 Mn/mo) is +16.3% HIGHER than FY25-26 (20,134.74 Mn/mo), proving ongoing volume expansion despite a 6-month aggregate!
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-slate-600">Metric View: Completeness &amp; Monthly Run-Rate Comparison</span>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => setMetricMode('MonthlyAverage')}
            className={`px-2.5 py-1 rounded-sm transition-colors font-medium ${
              metricMode === 'MonthlyAverage' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Average Run-Rate (Normalized)
          </button>
          <button
            onClick={() => setMetricMode('AnnualTotal')}
            className={`px-2.5 py-1 rounded-sm transition-colors font-medium ${
              metricMode === 'AnnualTotal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Raw Reported Annual Totals
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="financialYear" stroke="#64748B" fontSize={11} tickMargin={8} />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

            <Bar
              dataKey="displayVol"
              name={metricMode === 'MonthlyAverage' ? 'Monthly Average Volume (Mn / month)' : 'Annual Volume Total (Mn)'}
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isPartialYear ? '#F59E0B' : '#0EA5E9'} // Amber for 6-month partial year
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#0EA5E9]" />
          <span>Full Financial Year (12 Months)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#F59E0B]" />
          <span>Partial Financial Year (6 Months reported)</span>
        </div>
      </div>
    </div>
  );
};
