import React from 'react';
import { Cpu, Lightbulb, Construction, Sparkles, Clock } from 'lucide-react';

interface UnderDevelopmentViewProps {
  type: 'models' | 'insights';
}

export const UnderDevelopmentView: React.FC<UnderDevelopmentViewProps> = ({ type }) => {
  const isModels = type === 'models';

  const title = isModels ? 'Models' : 'Insights';
  const Icon = isModels ? Cpu : Lightbulb;
  const message = isModels
    ? 'Predictive modelling and advanced analytical models are currently under development and will be available in a future update.'
    : 'Consolidated insights and advanced analytical findings are currently under development and will be available in a future update.';

  const featuresList = isModels
    ? [
        'Time-series forecasting models (ARIMA, Prophet & LSTM) for UPI monthly volume & monetary throughput',
        'Machine learning classification for anomaly detection and unusual transaction volume spikes',
        'Ecosystem simulation models predicting bank onboarding capacity and network bottleneck thresholds',
      ]
    : [
        'Cross-platform correlation engine combining NPCI national macro-data with PhonePe Pulse regional statistics',
        'State-by-state digitalization velocity index evaluating digital payment readiness across Tier-2 to Tier-6 regions',
        'Automated executive policy recommendations and merchant QR adoption impact summaries',
      ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
              <Icon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Under Development
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isModels ? 'Machine Learning & Predictive Forecasting Pipeline' : 'Consolidated Ecosystem Intelligence & Synthesis'}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Notification Box */}
        <div className="p-5 bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-slate-50 border border-amber-200/80 rounded-xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
            <Construction className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Development Notice</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {message}
          </p>
        </div>

        {/* Roadmap / Features In Progress */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Modules Currently In Development:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuresList.map((feature, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="text-xs font-bold font-mono text-indigo-600">Phase 0{idx + 1}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
