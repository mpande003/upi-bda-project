import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { NPCIDerivedRecord } from '../../types/npci';
import { analyzeCorrelation, formatNumber } from '../../utils/statistics';

interface Props {
  data: NPCIDerivedRecord[];
}

export const Chart6BanksVsVolume: React.FC<Props> = ({ data }) => {
  const xVals = data.map(d => d.peakLiveBanks);
  const yVals = data.map(d => d.annualVolumeMn);

  const corr = analyzeCorrelation(xVals, yVals, 'Peak Live Banks', 'Annual Volume (Mn.)');

  // Generate regression line points from min X to max X
  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);
  const scatterPoints = data.map(d => ({
    x: d.peakLiveBanks,
    y: d.annualVolumeMn,
    year: d.financialYear,
    months: d.monthsCount,
  }));

  const linePoints = [
    { x: minX, yTrend: corr.slope * minX + corr.intercept },
    { x: maxX, yTrend: corr.slope * maxX + corr.intercept },
  ];

  // Merge points for composed chart
  const composedData = [...scatterPoints.map(p => ({ ...p, yTrend: corr.slope * p.x + corr.intercept }))].sort((a, b) => a.x - b.x);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800 space-y-1">
          <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>FY {point.year}</span>
            <span className="text-slate-400">({point.months} Months)</span>
          </div>
          <div className="text-sky-400 font-mono font-semibold">
            Peak Live Banks: {point.x}
          </div>
          <div className="text-emerald-400 font-mono font-semibold">
            Annual Volume: {formatNumber(point.y, 2)} Mn
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Correlation Summary Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-sky-50/80 border border-sky-100 rounded-lg text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sky-900">Pearson r: <span className="font-mono">{corr.pearsonR.toFixed(3)}</span></span>
          <span className="font-bold text-sky-900">Spearman ρ: <span className="font-mono">{corr.spearmanRho.toFixed(3)}</span></span>
          <span className="font-bold text-sky-900">R²: <span className="font-mono">{(corr.rSquared * 100).toFixed(1)}%</span></span>
        </div>
        <div className="text-slate-500 text-[11px] font-medium">N = {corr.sampleSize} Financial Years</div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={composedData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 800]}
              stroke="#64748B"
              fontSize={11}
              tickMargin={8}
              label={{ value: 'Peak Live Banks', position: 'insideBottom', offset: -15, fill: '#64748B', fontSize: 11 }}
            />
            <YAxis
              dataKey="y"
              stroke="#64748B"
              fontSize={11}
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k M`}
              label={{ value: 'Annual Volume (Mn.)', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Scatter name="Financial Years" dataKey="y" fill="#0EA5E9" line={false} shape="circle" />
            <Line
              type="monotone"
              dataKey="yTrend"
              name="Linear Trendline"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              activeDot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
