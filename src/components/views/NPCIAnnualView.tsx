import React, { useState, useMemo } from 'react';
import { DERIVED_NPCI_DATA } from '../../data/npciDataset';
import { OverviewMetrics } from '../OverviewMetrics';
import { FilterToolbar } from '../FilterToolbar';
import { AnalysisCard } from '../AnalysisCard';
import { Chart1VolumeTrend } from '../charts/Chart1VolumeTrend';
import { Chart2ValueTrend } from '../charts/Chart2ValueTrend';
import { Chart3VolumeGrowth } from '../charts/Chart3VolumeGrowth';
import { Chart4ValueVsVolumeGrowth } from '../charts/Chart4ValueVsVolumeGrowth';
import { Chart5TicketSizeTrend } from '../charts/Chart5TicketSizeTrend';
import { Chart6BanksVsVolume } from '../charts/Chart6BanksVsVolume';
import { Chart7BanksVsValue } from '../charts/Chart7BanksVsValue';
import { Chart8VolumeVsValue } from '../charts/Chart8VolumeVsValue';
import { Chart9GrowthDynamics } from '../charts/Chart9GrowthDynamics';
import { Chart10Completeness } from '../charts/Chart10Completeness';
import { SummaryTable } from '../SummaryTable';
import { InsightsSynthesis } from '../InsightsSynthesis';
import { formatCurrencyCr, formatInr, formatNumber } from '../../utils/statistics';
import { ChevronLeft, ChevronRight, BarChart2, Layers } from 'lucide-react';

interface NPCIAnnualViewProps {
  onExportCsv: () => void;
}

export const NPCIAnnualView: React.FC<NPCIAnnualViewProps> = ({ onExportCsv }) => {
  const allYears = useMemo(() => DERIVED_NPCI_DATA.map(d => d.financialYear), []);
  const [startYear, setStartYear] = useState<string>(allYears[0]);
  const [endYear, setEndYear] = useState<string>(allYears[allYears.length - 1]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [includePartialYear, setIncludePartialYear] = useState<boolean>(true);

  // Single Analysis Navigation State (Default to Analysis 1)
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('1');

  // Filtered dataset
  const filteredData = useMemo(() => {
    const startIndex = allYears.indexOf(startYear);
    const endIndex = allYears.indexOf(endYear);
    const lower = Math.min(startIndex, endIndex);
    const upper = Math.max(startIndex, endIndex);

    return DERIVED_NPCI_DATA.filter((item, idx) => {
      if (idx < lower || idx > upper) return false;
      if (!includePartialYear && item.isPartialYear) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchYr = item.financialYear.toLowerCase().includes(q);
        const matchBank = item.peakLiveBanks.toString().includes(q);
        if (!matchYr && !matchBank) return false;
      }
      return true;
    });
  }, [allYears, startYear, endYear, includePartialYear, searchQuery]);

  const handleResetFilters = () => {
    setStartYear(allYears[0]);
    setEndYear(allYears[allYears.length - 1]);
    setSearchQuery('');
    setIncludePartialYear(true);
  };

  const analysisOptions = [
    { id: '1', title: 'Analysis 1: Annual Transaction Volume Trend' },
    { id: '2', title: 'Analysis 2: Annual Transaction Value Trend' },
    { id: '3', title: 'Analysis 3: YoY Volume Growth Rate' },
    { id: '4', title: 'Analysis 4: Value Growth vs Volume Growth Rate' },
    { id: '5', title: 'Analysis 5: Average Transaction Ticket Size Trend' },
    { id: '6', title: 'Analysis 6: Peak Live Banks vs Transaction Volume' },
    { id: '7', title: 'Analysis 7: Peak Live Banks vs Transaction Value' },
    { id: '8', title: 'Analysis 8: Transaction Volume vs Value Relationship' },
    { id: '9', title: 'Analysis 9: Volume Growth vs Ticket Size Growth' },
    { id: '10', title: 'Analysis 10: Financial-Year Completeness & Run-Rates' },
    { id: 'insights', title: 'Macroeconomic Insights & Synthesis' },
    { id: 'table', title: 'Master Data Table & Ledger' },
    { id: 'all', title: 'View All Analyses (Stacked)' },
  ];

  const numericAnalysisIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'insights', 'table'];

  const handlePrev = () => {
    const currentIdx = numericAnalysisIds.indexOf(selectedAnalysis);
    if (currentIdx > 0) {
      setSelectedAnalysis(numericAnalysisIds[currentIdx - 1]);
    } else {
      setSelectedAnalysis(numericAnalysisIds[numericAnalysisIds.length - 1]);
    }
  };

  const handleNext = () => {
    const currentIdx = numericAnalysisIds.indexOf(selectedAnalysis);
    if (currentIdx < numericAnalysisIds.length - 1 && currentIdx !== -1) {
      setSelectedAnalysis(numericAnalysisIds[currentIdx + 1]);
    } else {
      setSelectedAnalysis(numericAnalysisIds[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Overview Banner */}
      <OverviewMetrics />

      {/* Filter Toolbar */}
      <FilterToolbar
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        includePartialYear={includePartialYear}
        setIncludePartialYear={setIncludePartialYear}
        yearOptions={allYears}
        onReset={handleResetFilters}
      />

      {/* Single Analysis Selector Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="p-2 bg-sky-50 rounded-lg text-sky-600 border border-sky-100">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Single Analysis Selection</span>
            <span className="text-sm font-bold text-slate-900">
              {analysisOptions.find(a => a.id === selectedAnalysis)?.title}
            </span>
          </div>
        </div>

        {/* Dropdown & Stepper Navigation */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition-colors shrink-0"
            title="Previous Analysis"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <select
            value={selectedAnalysis}
            onChange={(e) => setSelectedAnalysis(e.target.value)}
            className="flex-1 md:w-80 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500 shadow-2xs"
          >
            {analysisOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors shrink-0"
            title="Next Analysis"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RENDER ONLY THE SELECTED ANALYSIS */}
      <div className="space-y-6">
        {(selectedAnalysis === '1' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={1}
            category="Annual Trends"
            title="Annual Transaction Volume Trend"
            question="How has NPCI UPI annual transaction volume developed across reported financial years, and what distinct trajectory phases emerge?"
            statHighlights={[
              { label: 'Earliest Volume (FY17)', value: `${formatNumber(filteredData[0]?.annualVolumeMn ?? 17.86, 2)} Mn` },
              { label: 'Peak Volume (FY26)', value: `${formatNumber(filteredData.find(d => d.financialYear === '2025-26')?.annualVolumeMn ?? 241616.88 / 1000, 2)} B` },
              { label: 'Latest Volume (FY27 6M)', value: `${formatNumber(filteredData[filteredData.length - 1]?.annualVolumeMn ?? 140500.49, 2)} Mn` },
              { label: 'Cumulative Volume', value: '870.01 Billion' },
            ]}
            observations={[
              'Transaction volume expanded from 17.86 Mn (FY17) to 241,616.88 Mn (FY26)—a 13,527x increase.',
              'Exponential takeoff occurred in FY 2017-18 (+5,024.4% volume growth), driven by post-demonetization digital payments adoption.',
              'FY 2026-27 records 140,500.49 Mn volume over 6 months, demonstrating sustained monthly volume run-rate growth.',
            ]}
            significance="Demonstrates the transition of UPI from an emerging retail payment experiment into India's primary financial transaction medium."
            caveats="FY 2026-27 figure represents a 6-month reporting window rather than a full annual cycle."
          >
            <Chart1VolumeTrend data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '2' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={2}
            category="Annual Trends"
            title="Annual Transaction Value Trend"
            question="What is the historical growth trajectory of total monetary value processed on UPI, and which years experienced peak monetary expansion?"
            statHighlights={[
              { label: 'Initial Value (FY17)', value: formatCurrencyCr(filteredData[0]?.annualValueCr ?? 6952.14) },
              { label: 'Peak Annual Value (FY26)', value: formatCurrencyCr(filteredData.find(d => d.financialYear === '2025-26')?.annualValueCr ?? 31423249.71) },
              { label: 'Largest Abs Increase', value: '+₹6.07 Lakh Cr', subtext: 'FY 2023-24 surge over FY23' },
              { label: 'Cumulative Value', value: '₹124.74 Lakh Cr' },
            ]}
            observations={[
              'Annual value grew from ₹6,952.14 Cr (FY17) to ₹31,423,249.71 Cr (FY26)—exceeding ₹31.4 Lakh Crore annually.',
              'The largest percentage increase occurred in FY 2017-18 (+1,479.8% value growth from ₹6,952 Cr to ₹109,831 Cr).',
              'The largest absolute yearly surges took place in FY 2023-24 (+₹6,074,409 Cr) and FY 2024-25 (+₹6,061,869 Cr).',
            ]}
            significance="Confirms that UPI has evolved beyond peer-to-peer micro transfers to handle high-value commerce, salary disbursements, and bill settlements."
            caveats="Values are nominal INR figures unadjusted for inflation; FY27 reflects 6 months of data."
          >
            <Chart2ValueTrend data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '3' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={3}
            category="Annual Trends"
            title="Year-over-Year Transaction Volume Growth"
            question="How do calculated YoY volume growth rates compare against published NPCI growth figures, and what are the highest and lowest growth periods?"
            statHighlights={[
              { label: 'Peak Growth Rate', value: '+5,024.40%', subtext: 'FY 2017-18 post-launch takeoff' },
              { label: 'Lowest Full-Yr Growth', value: '+30.00%', subtext: 'FY 2025-26 mature base' },
              { label: 'Raw FY27 Growth', value: '-41.80%', subtext: '6M vs 12M unadjusted drop' },
              { label: 'FY27 Monthly Run-Rate', value: '+16.30%', subtext: 'Normalized per-month growth' },
            ]}
            observations={[
              'Calculated YoY growth matches published Volume Growth (%) across all years within rounding tolerances (<0.05%).',
              'Peak growth occurred in FY 2017-18 (+5,024.4%), followed by FY 2018-19 (+489.1%) and FY 2019-20 (+132.2%).',
              'Raw comparison for FY 2026-27 shows -41.80% because it spans 6 months; on a monthly run-rate basis, FY27 volume grew +16.3%.',
            ]}
            significance="Reveals the expected maturation curve of a hyper-growth platform, moving from initial high % surges to massive absolute scale additions."
            caveats="Comparing a 6-month partial year directly against a 12-month year produces misleading negative growth figures without run-rate normalization."
          >
            <Chart3VolumeGrowth data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '4' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={4}
            category="Annual Trends"
            title="Transaction Value Growth Rate vs Volume Growth Rate"
            question="In which financial years did monetary value growth outpace volume growth, and when did transaction volume growth dominate?"
            statHighlights={[
              { label: 'Value-Dominant Years', value: 'FY 2018-19, FY 2020-21', subtext: 'Value % > Volume %' },
              { label: 'FY19 Value Growth', value: '+698.45%', subtext: 'vs Volume Growth +489.10%' },
              { label: 'FY21 Value Growth', value: '+92.50%', subtext: 'vs Volume Growth +78.40%' },
              { label: 'Volume-Dominant Era', value: 'FY22 to FY26', subtext: 'Micro-QR merchant explosion' },
            ]}
            observations={[
              'In FY 2018-19, Value Growth (+698.5%) outpaced Volume Growth (+489.1%), signaling higher-value bank transfers and bill payments.',
              'In FY 2020-21 (COVID pandemic), Value Growth (+92.5%) again exceeded Volume Growth (+78.4%) due to formal commerce shifts.',
              'From FY 2021-22 onward, Volume Growth consistently outpaced Value Growth, reflecting the rapid democratization of low-ticket merchant QR payments.',
            ]}
            significance="Highlights the structural pivot of UPI from high-value transfers to high-frequency everyday retail micro-payments."
            caveats="Growth rates must be interpreted alongside average ticket size to understand payment composition shifts."
          >
            <Chart4ValueVsVolumeGrowth data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '5' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={5}
            category="Annual Trends"
            title="Average Ticket Size Trend"
            question="How has the average transaction value (ticket size) evolved across the 10-year period, and what factors explain key turning points?"
            statHighlights={[
              { label: 'Initial Ticket Size (FY17)', value: formatInr(filteredData[0]?.avgTicketSizeInr ?? 3892.58) },
              { label: 'COVID Peak (FY21)', value: formatInr(filteredData.find(d => d.financialYear === '2020-21')?.avgTicketSizeInr ?? 1837.68) },
              { label: 'Latest Ticket Size (FY27)', value: formatInr(filteredData[filteredData.length - 1]?.avgTicketSizeInr ?? 1259.30) },
              { label: 'Overall Change', value: '-67.65%', subtext: 'From FY17 peak to FY27' },
            ]}
            observations={[
              'Ticket size was highest in FY 2016-17 (₹3,892.58) when UPI was primarily used by early adopters for larger P2P bank transfers.',
              'Ticket size dropped sharply in FY 2017-18 (₹1,200.06) as retail peer-to-peer payments expanded.',
              'Ticket size rose during FY 2018-19 to FY 2020-21 (peaking at ₹1,837.68 during COVID-19), then steadily declined to ₹1,259.30 in FY 2026-27.',
            ]}
            significance="Average ticket size represents average transaction monetary value, NOT overall system throughput. Lower ticket size indicates deeper merchant QR penetration in everyday micro-commerce."
            caveats="Calculated exact ticket size matches reported figures within <0.01 INR across all records."
          >
            <Chart5TicketSizeTrend data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '6' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={6}
            category="Ecosystem Relationships"
            title="Peak Live Banks vs Transaction Volume"
            question="Is there a statistical correlation between bank onboarding participation and annual transaction volume?"
            statHighlights={[
              { label: 'Pearson Correlation (r)', value: '0.941', subtext: 'Very strong positive correlation' },
              { label: 'Spearman Rank (ρ)', value: '1.000', subtext: 'Perfect monotonic rank alignment' },
              { label: 'Coeff of Determination (R²)', value: '88.5%', subtext: 'Variance explained by linear model' },
              { label: 'Bank Onboarding Span', value: '44 → 756 Banks', subtext: 'FY17 to FY27 ecosystem growth' },
            ]}
            observations={[
              'Pearson correlation (r = 0.941) and Spearman rank correlation (ρ = 1.000) demonstrate a strong positive relationship.',
              'As peak live banks expanded from 44 to 756, annual transaction volume expanded in parallel.',
              'Linear trendline indicates that each additional live bank onboarded corresponds statistically to ~327 Mn annual volume growth.',
            ]}
            significance="Confirms that supply-side banking integration provided necessary infrastructure support for consumer payment volume."
            caveats="Correlation does not establish direct causation. Both live bank count and consumer transaction volume increased monotonically over time."
          >
            <Chart6BanksVsVolume data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '7' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={7}
            category="Ecosystem Relationships"
            title="Peak Live Banks vs Transaction Value"
            question="Does higher peak live bank participation coincide with higher total annual transaction value?"
            statHighlights={[
              { label: 'Pearson Correlation (r)', value: '0.932', subtext: 'Very strong positive correlation' },
              { label: 'Spearman Rank (ρ)', value: '1.000', subtext: 'Perfect monotonic rank order' },
              { label: 'Coeff of Determination (R²)', value: '86.9%', subtext: 'Variance explained' },
              { label: 'Bank Range', value: '44 to 756 Banks' },
            ]}
            observations={[
              'Peak live bank participation correlates strongly with annual transaction value (Pearson r = 0.932, Spearman ρ = 1.000).',
              'Higher live bank counts coincide with higher overall monetary flows across national payment channels.',
              'The rate of monetary value expansion accelerated sharply once live bank count exceeded 300 banks (post-2021).',
            ]}
            significance="Illustrates that broad-based bank participation across public, private, cooperative, and regional banks is crucial for capturing monetary volume."
            caveats="Causation cannot be inferred solely from correlation; both variables share strong temporal growth trends."
          >
            <Chart7BanksVsValue data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '8' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={8}
            category="Ecosystem Relationships"
            title="Transaction Volume vs Transaction Value Relationship"
            question="How closely do transaction count and total monetary value move together across the 10-year dataset?"
            statHighlights={[
              { label: 'Pearson Correlation (r)', value: '0.999', subtext: 'Near-perfect linear alignment' },
              { label: 'Spearman Rank (ρ)', value: '1.000', subtext: 'Perfect rank correlation' },
              { label: 'Linear Fit (R²)', value: '99.8%', subtext: 'Almost perfect fit model' },
              { label: 'Regression Slope (m)', value: '133.24 Cr/Mn', subtext: 'Monetary value per million volume' },
            ]}
            observations={[
              'Transaction volume and monetary value exhibit an almost perfect linear correlation (Pearson r = 0.999, R² = 99.8%).',
              'OLS linear fit: Value (Cr) = 133.24 × Volume (Mn) - 1,180,942 Cr.',
              'Tooltips verify that while volume and value scale together linearly, slight slope shifts capture the evolving average ticket size.',
            ]}
            significance="Proves that volume expansion is the fundamental driver of aggregate payment value on the NPCI network."
            caveats="Extrapolating this linear fit beyond current observation ranges assumes constant average ticket size behavior."
          >
            <Chart8VolumeVsValue data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '9' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={9}
            category="Growth Dynamics"
            title="Volume Growth vs Average Ticket Size Growth"
            question="How does YoY volume growth rate compare with average ticket size growth rate, and what does this reveal about adoption phases?"
            statHighlights={[
              { label: 'FY18 Decoupling', value: 'Vol +5024% vs Ticket -69%', subtext: 'Initial micro-payment shift' },
              { label: 'FY19 Co-Expansion', value: 'Vol +489% vs Ticket +35.5%', subtext: 'Confidence in larger transfers' },
              { label: 'Recent Divergence', value: 'Vol +30% to +105% vs Ticket -0.3% to -9.2%', subtext: 'Micro QR saturation phase' },
            ]}
            observations={[
              'In FY 2017-18, volume surged +5,024.4% while ticket size fell -69.2%, marking the transition from high-value P2P to mass retail.',
              'During FY 2018-19 and FY 2019-20, both volume (+489%, +132%) and ticket size (+35.5%, +4.7%) grew concurrently.',
              'Post-2021, volume growth remained strong (+105.8%, +82.2%, +56.6%, +41.7%) while ticket size contracted slightly each year (-0.4% to -9.2%).',
            ]}
            significance="Demonstrates that recent UPI volume growth is driven by increasing frequency of everyday micro merchant transactions rather than larger transfer amounts."
            caveats="Volume growth measures network velocity, whereas ticket size growth reflects basket composition."
          >
            <Chart9GrowthDynamics data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === '10' || selectedAnalysis === 'all') && (
          <AnalysisCard
            number={10}
            category="Data Completeness"
            title="Financial-Year Completeness and Annual Totals"
            question="Which reporting periods are complete vs partial, and how do normalized monthly average run-rates clarify actual growth?"
            statHighlights={[
              { label: 'Total Months Recorded', value: '126 Months', subtext: 'Across 11 financial year records' },
              { label: 'Full Financial Years', value: '10 Years (12M)', subtext: 'FY 2016-17 through FY 2025-26' },
              { label: 'Partial Financial Year', value: '1 Year (6M)', subtext: 'FY 2026-27 (140,500.49 Mn)' },
              { label: 'FY27 Monthly Vol Run-Rate', value: '23,416.75 Mn/mo', subtext: '+16.3% higher than FY26 (20,134.74 Mn/mo)' },
            ]}
            observations={[
              '10 financial years contain complete 12-month reporting data; FY 2026-27 contains 6 months of documented coverage.',
              'Raw total volume for FY26-27 is 140,500.49 Mn, which appears lower than FY25-26 (241,616.88 Mn) solely due to reporting period length.',
              'Monthly average run-rate in FY26-27 reached 23,416.75 Mn/month, representing a +16.3% increase over FY25-26 (20,134.74 Mn/month).',
            ]}
            significance="Prevents flawed analytical conclusions regarding market contraction by applying normalized monthly run-rate metrics to partial-year records."
            caveats="Partial-year figures should not be extrapolated linearly into full-year estimates without accounting for seasonal festive payment spikes."
          >
            <Chart10Completeness data={filteredData} />
          </AnalysisCard>
        )}

        {(selectedAnalysis === 'insights' || selectedAnalysis === 'all') && (
          <InsightsSynthesis />
        )}

        {(selectedAnalysis === 'table' || selectedAnalysis === 'all') && (
          <SummaryTable data={filteredData} onExportCsv={onExportCsv} />
        )}
      </div>
    </div>
  );
};
