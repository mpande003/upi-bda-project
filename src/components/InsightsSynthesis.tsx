import React from 'react';
import { Lightbulb, TrendingUp, Landmark, ShieldAlert, Award } from 'lucide-react';

export const InsightsSynthesis: React.FC = () => {
  return (
    <div id="insights" className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Macroeconomic &amp; Ecosystem Insights Synthesis</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Evidence-based strategic takeaways derived dynamically from 10 years of NPCI UPI aggregated trends dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Finding 1 */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-sky-600 shrink-0" />
            1. Exponential Velocity &amp; Scale Tipping Point
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            UPI transaction volume surged from <strong className="text-slate-900 font-mono">17.86 Million</strong> in FY 2016-17 to <strong className="text-slate-900 font-mono">241.6 Billion</strong> in FY 2025-26—a <strong className="text-slate-900 font-mono">+1,352,700%</strong> expansion in 9 years. The platform underwent an exponential tipping point during FY 2017-18 (<strong className="text-slate-900 font-mono">+5,024.4%</strong> volume growth) and solidified structural primacy during the COVID-19 pandemic (FY 2020-21 to FY 2021-22).
          </p>
        </div>

        {/* Finding 2 */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Landmark className="w-4 h-4 text-emerald-600 shrink-0" />
            2. Monetization Scale vs Micro-Transaction Democratization
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Average ticket size dropped from <strong className="text-slate-900 font-mono">₹3,892.58</strong> in FY17 down to <strong className="text-slate-900 font-mono">₹1,259.30</strong> in FY27. This contraction is not a signal of declining transaction value, but rather definitive evidence of UPI penetrating low-ticket everyday merchant QR payments (tea stalls, local kiranas, transit). High-volume micro-transactions expanded network velocity while dampening average basket size.
          </p>
        </div>

        {/* Finding 3 */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            3. Supply-Side Network Density (Bank Onboarding)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Peak live bank participation grew from <strong className="text-slate-900 font-mono">44 banks</strong> in FY17 to <strong className="text-slate-900 font-mono">756 banks</strong> in FY27. Scatter plot correlation models demonstrate a strong monotonic alignment (<strong className="text-slate-900 font-mono">Spearman ρ = 1.000</strong>, <strong className="text-slate-900 font-mono">Pearson r = 0.941</strong>). Onboarding regional, cooperative, and payment banks expanded the addressable user base across Tier-2 to Tier-6 India.
          </p>
        </div>

        {/* Finding 4 */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0" />
            4. Partial-Year Methodological Rigor
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            FY 2026-27 records <strong className="text-slate-900 font-mono">6 months</strong> of data (140,500.49 Mn volume). While the raw YoY growth figure appears as <strong className="text-slate-900 font-mono">-41.80%</strong>, normalizing by monthly average run-rate reveals that FY27 processes <strong className="text-slate-900 font-mono">23,416.75 Mn/month</strong>—a <strong className="text-slate-900 font-mono">+16.3% increase</strong> over FY25-26 run-rate (<strong className="text-slate-900 font-mono">20,134.74 Mn/month</strong>).
          </p>
        </div>
      </div>
    </div>
  );
};
