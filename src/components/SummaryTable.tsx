import React, { useState } from 'react';
import { NPCIDerivedRecord } from '../types/npci';
import { SUMMARY_RECORD } from '../data/npciDataset';
import { formatCurrencyCr, formatInr, formatNumber, formatPercent } from '../utils/statistics';
import { ArrowUpDown, Download, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';

interface SummaryTableProps {
  data: NPCIDerivedRecord[];
  onExportCsv: () => void;
}

type SortField = 'financialYear' | 'monthsCount' | 'peakLiveBanks' | 'annualVolumeMn' | 'annualValueCr' | 'avgTicketSizeInr' | 'volumeGrowthPct';

export const SummaryTable: React.FC<SummaryTableProps> = ({ data, onExportCsv }) => {
  const [sortField, setSortField] = useState<SortField>('financialYear');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField] ?? 0;
    let bVal = b[sortField] ?? 0;
    if (typeof aVal === 'string') {
      return sortAsc ? (aVal as string).localeCompare(bVal as string) : (bVal as string).localeCompare(aVal as string);
    }
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  return (
    <div id="dataset-table" className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      {/* Table Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">NPCI Aggregated Annual Trends Dataset</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete multi-year ledger including published records, calculated ticket sizes, run rates, and reconciliation checks.
          </p>
        </div>

        <button
          onClick={onExportCsv}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-sky-400" />
          <span>Export Dataset CSV</span>
        </button>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-3 px-3">Status</th>
              <th
                onClick={() => handleSort('financialYear')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Financial Year</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('monthsCount')}
                className="py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Months</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('peakLiveBanks')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Live Banks</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('annualVolumeMn')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Annual Vol (Mn)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('annualValueCr')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Annual Value (Cr)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('avgTicketSizeInr')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Reported Ticket Size</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-right">Calculated Ticket Size</th>
              <th
                onClick={() => handleSort('volumeGrowthPct')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume Growth (%)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-right">Monthly Avg Vol (Mn)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((row) => (
              <tr
                key={row.financialYear}
                className={`hover:bg-slate-50/80 transition-colors ${
                  row.isPartialYear ? 'bg-amber-50/30' : ''
                }`}
              >
                <td className="py-2.5 px-3">
                  {row.isPartialYear ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      6M Partial
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      12M Full
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-900 font-mono">{row.financialYear}</td>
                <td className="py-2.5 px-3 text-center font-mono tabular-nums text-slate-700">{row.monthsCount}</td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">{row.peakLiveBanks}</td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-sky-700 font-semibold">
                  {formatNumber(row.annualVolumeMn, 2)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-indigo-700 font-semibold">
                  {formatCurrencyCr(row.annualValueCr)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-emerald-700">
                  {formatInr(row.avgTicketSizeInr)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                  {formatInr(row.calculatedTicketSizeInr)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                  <span className={row.volumeGrowthPct && row.volumeGrowthPct < 0 ? 'text-rose-600' : 'text-slate-800'}>
                    {formatPercent(row.volumeGrowthPct)}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                  {formatNumber(row.monthlyAvgVolumeMn, 2)}
                </td>
              </tr>
            ))}

            {/* Grand Total Summary Row */}
            <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-800">
              <td className="py-3 px-3">
                <span className="text-[11px] font-medium text-sky-400 uppercase tracking-wider">Cumulative</span>
              </td>
              <td className="py-3 px-3 font-mono">{SUMMARY_RECORD.financialYear}</td>
              <td className="py-3 px-3 text-center font-mono tabular-nums">{SUMMARY_RECORD.monthsCount}</td>
              <td className="py-3 px-3 text-right font-mono tabular-nums">{SUMMARY_RECORD.peakLiveBanks}</td>
              <td className="py-3 px-3 text-right font-mono tabular-nums text-sky-400">
                {formatNumber(SUMMARY_RECORD.annualVolumeMn, 2)}
              </td>
              <td className="py-3 px-3 text-right font-mono tabular-nums text-indigo-300">
                {formatCurrencyCr(SUMMARY_RECORD.annualValueCr)}
              </td>
              <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-400">
                {formatInr(SUMMARY_RECORD.avgTicketSizeInr)}
              </td>
              <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                {formatInr((SUMMARY_RECORD.annualValueCr / SUMMARY_RECORD.annualVolumeMn) * 10)}
              </td>
              <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-400">-</td>
              <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                {formatNumber(SUMMARY_RECORD.annualVolumeMn / SUMMARY_RECORD.monthsCount, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
