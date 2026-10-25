/**
 * NPCI Aggregated Annual Trends Data Types
 */

export interface NPCIRawRecord {
  financialYear: string;
  monthsCount: number;
  peakLiveBanks: number;
  annualVolumeMn: number;
  annualValueCr: number;
  avgTicketSizeInr: number;
  volumeGrowthPct: number | null; // null for first year or grand total
  isPartialYear: boolean;
  isSummaryRow?: boolean;
}

export interface NPCIDerivedRecord extends NPCIRawRecord {
  // Calculated metrics
  calculatedVolumeGrowthPct: number | null;
  calculatedValueGrowthPct: number | null;
  calculatedTicketSizeInr: number; // derived from (annualValueCr * 10^7) / (annualVolumeMn * 10^6)
  ticketSizeDiscrepancyInr: number; // reported - calculated
  ticketSizeYoYChangePct: number | null;
  
  // Monthly average run rates
  monthlyAvgVolumeMn: number;
  monthlyAvgValueCr: number;
  
  // Human readable representations
  annualVolumeBillion: number;
  annualValueLakhCr: number;
}

export interface CorrelationResult {
  pearsonR: number;
  spearmanRho: number;
  rSquared: number;
  slope: number;
  intercept: number;
  sampleSize: number;
  interpretation: string;
}

export interface ValidationCheckResult {
  id: string;
  title: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
  discrepancies?: string[];
}
