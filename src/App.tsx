import { useState } from 'react';
import { Navbar, MainSection } from './components/Navbar';
import { DatasetSelector, NPCIDatasetOption, PhonePeDatasetOption } from './components/DatasetSelector';
import { NPCIAnnualView } from './components/views/NPCIAnnualView';
import { NPCIMonthlyView } from './components/views/NPCIMonthlyView';
import { PhonePeAggTransView } from './components/views/PhonePeAggTransView';
import { PhonePeMapTransView } from './components/views/PhonePeMapTransView';
import { PhonePeTopTransView } from './components/views/PhonePeTopTransView';
import { UnderDevelopmentView } from './components/views/UnderDevelopmentView';
import { ValidationReport } from './components/ValidationReport';
import { DERIVED_NPCI_DATA } from './data/npciDataset';

export default function App() {
  // Navigation State Model
  const [activeSection, setActiveSection] = useState<MainSection>('npci');
  const [selectedNPCIDataset, setSelectedNPCIDataset] = useState<NPCIDatasetOption>('annual_trends');
  const [selectedPhonePeDataset, setSelectedPhonePeDataset] = useState<PhonePeDatasetOption>('agg_trans');

  // Modal State
  const [isValidationOpen, setIsValidationOpen] = useState(false);

  // Global CSV Export Handler
  const handleExportNPCIAnnualCsv = () => {
    const headers = [
      'Financial Year',
      'Months Count',
      'Peak Live Banks',
      'Annual Volume (Mn.)',
      'Annual Value (Cr.)',
      'Reported Avg Ticket Size (INR)',
      'Calculated Avg Ticket Size (INR)',
      'Published Volume Growth (%)',
      'Calculated YoY Volume Growth (%)',
      'Calculated YoY Value Growth (%)',
      'Monthly Avg Volume (Mn.)',
      'Monthly Avg Value (Cr.)',
    ];

    const csvRows = DERIVED_NPCI_DATA.map(d => [
      `"${d.financialYear}"`,
      d.monthsCount,
      d.peakLiveBanks,
      d.annualVolumeMn,
      d.annualValueCr,
      d.avgTicketSizeInr,
      d.calculatedTicketSizeInr.toFixed(2),
      d.volumeGrowthPct !== null ? d.volumeGrowthPct : '',
      d.calculatedVolumeGrowthPct !== null ? d.calculatedVolumeGrowthPct.toFixed(2) : '',
      d.calculatedValueGrowthPct !== null ? d.calculatedValueGrowthPct.toFixed(2) : '',
      d.monthlyAvgVolumeMn.toFixed(2),
      d.monthlyAvgValueCr.toFixed(2),
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...csvRows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NPCI_UPI_Annual_Trends_Full.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased selection:bg-sky-500 selection:text-white pb-16">
      {/* 1. Main Persistent Menu Bar (4 items) */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Viewport Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* 2. Dataset Selectors for NPCI and PhonePe Sections */}
        {(activeSection === 'npci' || activeSection === 'phonepe') && (
          <DatasetSelector
            section={activeSection}
            selectedNPCIDataset={selectedNPCIDataset}
            setSelectedNPCIDataset={setSelectedNPCIDataset}
            selectedPhonePeDataset={selectedPhonePeDataset}
            setSelectedPhonePeDataset={setSelectedPhonePeDataset}
          />
        )}

        {/* 3. Section Views — Strictly Isolating Selected Dataset Analytics */}
        {activeSection === 'npci' && (
          <>
            {selectedNPCIDataset === 'annual_trends' && (
              <NPCIAnnualView onExportCsv={handleExportNPCIAnnualCsv} />
            )}
            {selectedNPCIDataset === 'monthly_ecosystem' && (
              <NPCIMonthlyView />
            )}
          </>
        )}

        {activeSection === 'phonepe' && (
          <>
            {selectedPhonePeDataset === 'agg_trans' && (
              <PhonePeAggTransView />
            )}
            {selectedPhonePeDataset === 'map_trans' && (
              <PhonePeMapTransView />
            )}
            {selectedPhonePeDataset === 'top_trans' && (
              <PhonePeTopTransView />
            )}
          </>
        )}

        {/* 4. Models View — Under Development */}
        {activeSection === 'models' && (
          <UnderDevelopmentView type="models" />
        )}

        {/* 5. Insights View — Under Development */}
        {activeSection === 'insights' && (
          <UnderDevelopmentView type="insights" />
        )}
      </main>

      {/* Validation Modal Drawer */}
      <ValidationReport
        isOpen={isValidationOpen}
        onClose={() => setIsValidationOpen(false)}
      />
    </div>
  );
}
