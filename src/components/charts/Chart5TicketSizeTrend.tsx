import React from 'react';
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
import { formatInr, formatPercent } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart5TicketSizeTrend: React.FC<Props> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record: NPCIDerivedRecord = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800 space-y-1">
          <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>FY {label}</span>
            <span className="text-slate-400">({record.monthsCount} Months)</span>
          </div>
          <div className="text-emerald-400 font-mono font-bold text-sm">
            Avg Ticket Size: {formatInr(record.avgTicketSizeInr)}
          </div>
          <div className="text-slate-300">
            YoY Change: {formatPercent(record.ticketSizeYoYChangePct)}
          </div>
          <div className="text-slate-400 text-[11px] pt-1">
            Calculated Check: (₹{record.annualValueCr.toLocaleString()} Cr / {record.annualVolumeMn.toLocaleString()} Mn) × 10 = ₹{record.calculatedTicketSizeInr.toFixed(2)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Metric: Average Transaction Ticket Size (₹)</span>
        <span className="text-slate-500 italic">Formula: (Annual Value Cr × 10^7) / (Annual Volume Mn × 10^6)</span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="financialYear" stroke="#64748B" fontSize={11} tickMargin={8} />
            <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `₹${val}`} domain={[1000, 4200]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

            <ReferenceLine x="2016-17" stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Early Bank P2P (₹3,893)', position: 'top', fill: '#DC2626', fontSize: 10 }} />
            <ReferenceLine x="2020-21" stroke="#10B981" strokeDasharray="3 3" label={{ value: 'COVID Peak (₹1,838)', position: 'top', fill: '#059669', fontSize: 10 }} />
            <ReferenceLine x="2026-27" stroke="#0EA5E9" strokeDasharray="3 3" label={{ value: 'Micro QR Era (₹1,259)', position: 'top', fill: '#0284C7', fontSize: 10 }} />

            <Line
              type="monotone"
              dataKey="avgTicketSizeInr"
              name="Avg Ticket Size (₹)"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, fill: '#047857' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
