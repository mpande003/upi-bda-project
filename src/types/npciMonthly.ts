/**
 * NPCI Consolidated Monthly Ecosystem Statistics (P2P & P2M) Types
 */

export interface NPCIMonthlyRecord {
  monthYear: string; // e.g. "2024-01", "2024-02"
  year: number;
  monthName: string;
  totalVolumeMn: number;
  totalValueCr: number;
  p2pVolumeMn: number;
  p2pValueCr: number;
  p2mVolumeMn: number;
  p2mValueCr: number;
}

export interface NPCIMonthlyDerivedRecord extends NPCIMonthlyRecord {
  // Volume & Value Shares (%)
  p2pVolumeSharePct: number;
  p2mVolumeSharePct: number;
  p2pValueSharePct: number;
  p2mValueSharePct: number;

  // Ticket Sizes (₹)
  avgTicketSizeTotalInr: number;
  avgTicketSizeP2PInr: number;
  avgTicketSizeP2MInr: number;

  // Month-over-Month Growth (%)
  momVolumeGrowthPct: number | null;
  momValueGrowthPct: number | null;
}
