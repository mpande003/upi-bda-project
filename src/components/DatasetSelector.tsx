import React from 'react';
import { Database, CheckCircle2 } from 'lucide-react';

export type NPCIDatasetOption = 'annual_trends' | 'monthly_ecosystem';
export type PhonePeDatasetOption = 'agg_trans' | 'map_trans' | 'top_trans';

interface DatasetSelectorProps {
  section: 'npci' | 'phonepe';
  selectedNPCIDataset: NPCIDatasetOption;
  setSelectedNPCIDataset: (ds: NPCIDatasetOption) => void;
  selectedPhonePeDataset: PhonePeDatasetOption;
  setSelectedPhonePeDataset: (ds: PhonePeDatasetOption) => void;
}

export const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  section,
  selectedNPCIDataset,
  setSelectedNPCIDataset,
  selectedPhonePeDataset,
  setSelectedPhonePeDataset,
}) => {
  if (section === 'npci') {
    const options: { id: NPCIDatasetOption; title: string; desc: string }[] = [
      {
        id: 'annual_trends',
        title: 'Aggregated Annual Trends',
        desc: '10-Year Annual macro-trends, volumes, values, ticket sizes & correlations',
      },
      {
        id: 'monthly_ecosystem',
        title: 'Consolidated Monthly Ecosystem Statistics — P2P & P2M',
        desc: 'Monthly P2P vs P2M volume/value breakdown, shares, MoM growth & seasonality',
      },
    ];

    return (
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Database className="w-4 h-4 text-sky-600" />
          <span>Select NPCI Dataset:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((opt) => {
            const isSelected = selectedNPCIDataset === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedNPCIDataset(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-sky-950' : 'text-slate-800'}`}>
                    {opt.title}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />}
                </div>
                <p className={`text-xs mt-1 leading-snug ${isSelected ? 'text-sky-800' : 'text-slate-500'}`}>
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (section === 'phonepe') {
    const options: { id: PhonePeDatasetOption; title: string; filename: string; desc: string }[] = [
      {
        id: 'agg_trans',
        title: 'Aggregated Transactions',
        filename: 'Agg_Trans.csv',
        desc: 'State, Year, Quarter & Transaction Type breakdown (P2P, Merchant, Bills)',
      },
      {
        id: 'map_trans',
        title: 'Geographic Transactions',
        filename: 'Map_Trans.csv',
        desc: 'District-level transaction activity, state rankings & geographic spread',
      },
      {
        id: 'top_trans',
        title: 'Top Transactions',
        filename: 'Top_Trans.csv',
        desc: 'Hyper-local top districts & top pincodes by count & monetary volume',
      },
    ];

    return (
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Database className="w-4 h-4 text-indigo-600" />
          <span>Select PhonePe Pulse Dataset:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {options.map((opt) => {
            const isSelected = selectedPhonePeDataset === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedPhonePeDataset(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                      {opt.title}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />}
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-mono text-[10px] font-semibold">
                    {opt.filename}
                  </span>
                  <p className={`text-xs mt-1.5 leading-snug ${isSelected ? 'text-indigo-800' : 'text-slate-500'}`}>
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
