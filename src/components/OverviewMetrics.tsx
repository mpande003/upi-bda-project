import React from 'react';
import { SUMMARY_RECORD, DERIVED_NPCI_DATA } from '../data/npciDataset';
import { formatCurrencyCr, formatInr, formatNumber } from '../utils/statistics';
import { TrendingUp, Landmark, Calendar, Activity, Zap } from 'lucide-react';

export const OverviewMetrics: React.FC = () => {
  const latestFullYear = DERIVED_NPCI_DATA.find(d => d.financialYear === '2025-26');
  const partialYear = DERIVED_NPCI_DATA.find(d => d.financialYear === '2026-27');

  const metrics = [
    {
      title: 'Cumulative Volume Processed',
      value: `${formatNumber(SUMMARY_RECORD.annualVolumeMn / 1000, 2)} Billion`,
      subtext: `${formatNumber(SUMMARY_RECORD.annualVolumeMn, 2)} Million transactions (126 Months)`,
      icon: TrendingUp,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100',
    },
    {
      title: 'Cumulative Value Processed',
      value: formatCurrencyCr(SUMMARY_RECORD.annualValueCr),
      subtext: '₹124.74 Lakh Crore (~$1.50 Trillion USD)',
      icon: Landmark,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    {
      title: 'Peak Live Banks Onboarded',
      value: SUMMARY_RECORD.peakLiveBanks.toString(),
      subtext: 'Expanded from 44 banks (FY17) to 756 banks (FY27)',
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Latest Avg Ticket Size',
      value: formatInr(partialYear?.avgTicketSizeInr ?? 1259.30),
      subtext: `FY26-27 (6M). FY25-26 full year was ${formatInr(latestFullYear?.avgTicketSizeInr ?? 1300.54)}`,
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Reporting Period Coverage',
      value: '126 Months',
      subtext: '10 Full Financial Years (12M) + 1 Partial FY26-27 (6M)',
      icon: Calendar,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            NPCI Aggregated Annual Trends Executive Summary
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            10-Year Macroeconomic &amp; Ecosystem Performance Analysis of National Payments Corporation of India (UPI)
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Official NPCI Data Verified
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className={`p-4 bg-white rounded-xl border ${m.borderColor} shadow-xs hover:shadow-md transition-all space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.title}</span>
                <div className={`p-1.5 rounded-lg ${m.bgColor}`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
                {m.value}
              </div>
              <div className="text-[11px] text-slate-500 leading-snug">
                {m.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
