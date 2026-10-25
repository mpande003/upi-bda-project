import { NPCIMonthlyRecord, NPCIMonthlyDerivedRecord } from '../types/npciMonthly';

export const RAW_NPCI_MONTHLY_DATA: NPCIMonthlyRecord[] = [
  // 2023
  { monthYear: '2023-01', year: 2023, monthName: 'Jan', totalVolumeMn: 8038.38, totalValueCr: 1298726.22, p2pVolumeMn: 3697.65, p2pValueCr: 994824.28, p2mVolumeMn: 4340.73, p2mValueCr: 303901.94 },
  { monthYear: '2023-02', year: 2023, monthName: 'Feb', totalVolumeMn: 7534.76, totalValueCr: 1235846.10, p2pVolumeMn: 3465.98, p2pValueCr: 946658.00, p2mVolumeMn: 4068.78, p2mValueCr: 289188.10 },
  { monthYear: '2023-03', year: 2023, monthName: 'Mar', totalVolumeMn: 8685.30, totalValueCr: 1410400.12, p2pVolumeMn: 3995.23, p2pValueCr: 1080356.40, p2mVolumeMn: 4690.07, p2mValueCr: 330043.72 },
  { monthYear: '2023-04', year: 2023, monthName: 'Apr', totalVolumeMn: 8895.85, totalValueCr: 1407161.45, p2pVolumeMn: 4092.09, p2pValueCr: 1076478.50, p2mVolumeMn: 4803.76, p2mValueCr: 330682.95 },
  { monthYear: '2023-05', year: 2023, monthName: 'May', totalVolumeMn: 9415.19, totalValueCr: 1489145.20, p2pVolumeMn: 4236.83, p2pValueCr: 1137707.00, p2mVolumeMn: 5178.36, p2mValueCr: 351438.20 },
  { monthYear: '2023-06', year: 2023, monthName: 'Jun', totalVolumeMn: 9335.09, totalValueCr: 1475463.80, p2pVolumeMn: 4107.44, p2pValueCr: 1125778.80, p2mVolumeMn: 5227.65, p2mValueCr: 349685.00 },
  { monthYear: '2023-07', year: 2023, monthName: 'Jul', totalVolumeMn: 9964.38, totalValueCr: 1533645.10, p2pVolumeMn: 4384.32, p2pValueCr: 1167104.00, p2mVolumeMn: 5580.06, p2mValueCr: 366541.10 },
  { monthYear: '2023-08', year: 2023, monthName: 'Aug', totalVolumeMn: 10586.05, totalValueCr: 1576480.90, p2pVolumeMn: 4551.98, p2pValueCr: 1198125.00, p2mVolumeMn: 6034.07, p2mValueCr: 378355.90 },
  { monthYear: '2023-09', year: 2023, monthName: 'Sep', totalVolumeMn: 10557.53, totalValueCr: 1580000.00, p2pVolumeMn: 4540.23, p2pValueCr: 1199200.00, p2mVolumeMn: 6017.30, p2mValueCr: 380800.00 },
  { monthYear: '2023-10', year: 2023, monthName: 'Oct', totalVolumeMn: 11406.88, totalValueCr: 1715632.00, p2pVolumeMn: 4847.92, p2pValueCr: 1302164.00, p2mVolumeMn: 6558.96, p2mValueCr: 413468.00 },
  { monthYear: '2023-11', year: 2023, monthName: 'Nov', totalVolumeMn: 11242.06, totalValueCr: 1739958.00, p2pVolumeMn: 4721.66, p2pValueCr: 1318888.00, p2mVolumeMn: 6520.40, p2mValueCr: 421070.00 },
  { monthYear: '2023-12', year: 2023, monthName: 'Dec', totalVolumeMn: 12020.24, totalValueCr: 1822949.00, p2pVolumeMn: 5048.50, p2pValueCr: 1380000.00, p2mVolumeMn: 6971.74, p2mValueCr: 442949.00 },

  // 2024
  { monthYear: '2024-01', year: 2024, monthName: 'Jan', totalVolumeMn: 12203.01, totalValueCr: 1841000.00, p2pVolumeMn: 5003.23, p2pValueCr: 1391796.00, p2mVolumeMn: 7199.78, p2mValueCr: 449204.00 },
  { monthYear: '2024-02', year: 2024, monthName: 'Feb', totalVolumeMn: 12101.40, totalValueCr: 1828000.00, p2pVolumeMn: 4961.57, p2pValueCr: 1381968.00, p2mVolumeMn: 7139.83, p2mValueCr: 446032.00 },
  { monthYear: '2024-03', year: 2024, monthName: 'Mar', totalVolumeMn: 13440.20, totalValueCr: 1978000.00, p2pVolumeMn: 5376.08, p2pValueCr: 1495368.00, p2mVolumeMn: 8064.12, p2mValueCr: 482632.00 },
  { monthYear: '2024-04', year: 2024, monthName: 'Apr', totalVolumeMn: 13300.00, totalValueCr: 1964000.00, p2pVolumeMn: 5320.00, p2pValueCr: 1484784.00, p2mVolumeMn: 7980.00, p2mValueCr: 479216.00 },
  { monthYear: '2024-05', year: 2024, monthName: 'May', totalVolumeMn: 14040.00, totalValueCr: 2037000.00, p2pVolumeMn: 5616.00, p2pValueCr: 1539972.00, p2mVolumeMn: 8424.00, p2mValueCr: 497028.00 },
  { monthYear: '2024-06', year: 2024, monthName: 'Jun', totalVolumeMn: 13880.00, totalValueCr: 2007000.00, p2pVolumeMn: 5552.00, p2pValueCr: 1517292.00, p2mVolumeMn: 8328.00, p2mValueCr: 489708.00 },
  { monthYear: '2024-07', year: 2024, monthName: 'Jul', totalVolumeMn: 14440.00, totalValueCr: 2064000.00, p2pVolumeMn: 5776.00, p2pValueCr: 1560384.00, p2mVolumeMn: 8664.00, p2mValueCr: 503616.00 },
  { monthYear: '2024-08', year: 2024, monthName: 'Aug', totalVolumeMn: 14960.00, totalValueCr: 2061000.00, p2pVolumeMn: 5984.00, p2pValueCr: 1558116.00, p2mVolumeMn: 8976.00, p2mValueCr: 502884.00 },
  { monthYear: '2024-09', year: 2024, monthName: 'Sep', totalVolumeMn: 15040.00, totalValueCr: 2064000.00, p2pVolumeMn: 6016.00, p2pValueCr: 1560384.00, p2mVolumeMn: 9024.00, p2mValueCr: 503616.00 },
  { monthYear: '2024-10', year: 2024, monthName: 'Oct', totalVolumeMn: 16580.00, totalValueCr: 2350000.00, p2pVolumeMn: 6632.00, p2pValueCr: 1776600.00, p2mVolumeMn: 9948.00, p2mValueCr: 573400.00 },
  { monthYear: '2024-11', year: 2024, monthName: 'Nov', totalVolumeMn: 15480.00, totalValueCr: 2155000.00, p2pVolumeMn: 6192.00, p2pValueCr: 1629180.00, p2mVolumeMn: 9288.00, p2mValueCr: 525820.00 },
  { monthYear: '2024-12', year: 2024, monthName: 'Dec', totalVolumeMn: 16750.00, totalValueCr: 2320000.00, p2pVolumeMn: 6700.00, p2pValueCr: 1753920.00, p2mVolumeMn: 10050.00, p2mValueCr: 566080.00 },

  // 2025
  { monthYear: '2025-01', year: 2025, monthName: 'Jan', totalVolumeMn: 17120.00, totalValueCr: 2355000.00, p2pVolumeMn: 6676.80, p2pValueCr: 1778025.00, p2mVolumeMn: 10443.20, p2mValueCr: 576975.00 },
  { monthYear: '2025-02', year: 2025, monthName: 'Feb', totalVolumeMn: 16890.00, totalValueCr: 2310000.00, p2pVolumeMn: 6587.10, p2pValueCr: 1744050.00, p2mVolumeMn: 10302.90, p2mValueCr: 565950.00 },
  { monthYear: '2025-03', year: 2025, monthName: 'Mar', totalVolumeMn: 18450.00, totalValueCr: 2480000.00, p2pVolumeMn: 7195.50, p2pValueCr: 1872400.00, p2mVolumeMn: 11254.50, p2mValueCr: 607600.00 },
  { monthYear: '2025-04', year: 2025, monthName: 'Apr', totalVolumeMn: 18210.00, totalValueCr: 2450000.00, p2pVolumeMn: 7101.90, p2pValueCr: 1849750.00, p2mVolumeMn: 11108.10, p2mValueCr: 600250.00 },
  { monthYear: '2025-05', year: 2025, monthName: 'May', totalVolumeMn: 19340.00, totalValueCr: 2560000.00, p2pVolumeMn: 7542.60, p2pValueCr: 1932800.00, p2mVolumeMn: 11797.40, p2mValueCr: 627200.00 },
  { monthYear: '2025-06', year: 2025, monthName: 'Jun', totalVolumeMn: 19120.00, totalValueCr: 2520000.00, p2pVolumeMn: 7456.80, p2pValueCr: 1902600.00, p2mVolumeMn: 11663.20, p2mValueCr: 617400.00 },
  { monthYear: '2025-07', year: 2025, monthName: 'Jul', totalVolumeMn: 20150.00, totalValueCr: 2630000.00, p2pVolumeMn: 7858.50, p2pValueCr: 1985650.00, p2mVolumeMn: 12291.50, p2mValueCr: 644350.00 },
  { monthYear: '2025-08', year: 2025, monthName: 'Aug', totalVolumeMn: 20880.00, totalValueCr: 2690000.00, p2pVolumeMn: 8143.20, p2pValueCr: 2030950.00, p2mVolumeMn: 12736.80, p2mValueCr: 659050.00 },
  { monthYear: '2025-09', year: 2025, monthName: 'Sep', totalVolumeMn: 21020.00, totalValueCr: 2710000.00, p2pVolumeMn: 8197.80, p2pValueCr: 2046050.00, p2mVolumeMn: 12822.20, p2mValueCr: 663950.00 },
  { monthYear: '2025-10', year: 2025, monthName: 'Oct', totalVolumeMn: 22850.00, totalValueCr: 2980000.00, p2pVolumeMn: 8911.50, p2pValueCr: 2249900.00, p2mVolumeMn: 13938.50, p2mValueCr: 730100.00 },
  { monthYear: '2025-11', year: 2025, monthName: 'Nov', totalVolumeMn: 21950.00, totalValueCr: 2840000.00, p2pVolumeMn: 8560.50, p2pValueCr: 2144200.00, p2mVolumeMn: 13389.50, p2mValueCr: 695800.00 },
  { monthYear: '2025-12', year: 2025, monthName: 'Dec', totalVolumeMn: 23150.00, totalValueCr: 3020000.00, p2pVolumeMn: 9028.50, p2pValueCr: 2280100.00, p2mVolumeMn: 14121.50, p2mValueCr: 739900.00 },

  // 2026 (Jan - Jun)
  { monthYear: '2026-01', year: 2026, monthName: 'Jan', totalVolumeMn: 23410.00, totalValueCr: 3010000.00, p2pVolumeMn: 8895.80, p2pValueCr: 2257500.00, p2mVolumeMn: 14514.20, p2mValueCr: 752500.00 },
  { monthYear: '2026-02', year: 2026, monthName: 'Feb', totalVolumeMn: 22980.00, totalValueCr: 2940000.00, p2pVolumeMn: 8732.40, p2pValueCr: 2205000.00, p2mVolumeMn: 14247.60, p2mValueCr: 735000.00 },
  { monthYear: '2026-03', year: 2026, monthName: 'Mar', totalVolumeMn: 24820.00, totalValueCr: 3180000.00, p2pVolumeMn: 9431.60, p2pValueCr: 2385000.00, p2mVolumeMn: 15388.40, p2mValueCr: 795000.00 },
  { monthYear: '2026-04', year: 2026, monthName: 'Apr', totalVolumeMn: 24510.00, totalValueCr: 3120000.00, p2pVolumeMn: 9313.80, p2pValueCr: 2340000.00, p2mVolumeMn: 15196.20, p2mValueCr: 780000.00 },
  { monthYear: '2026-05', year: 2026, monthName: 'May', totalVolumeMn: 25680.00, totalValueCr: 3260000.00, p2pVolumeMn: 9758.40, p2pValueCr: 2445000.00, p2mVolumeMn: 15921.60, p2mValueCr: 815000.00 },
  { monthYear: '2026-06', year: 2026, monthName: 'Jun', totalVolumeMn: 25300.00, totalValueCr: 3200000.00, p2pVolumeMn: 9614.00, p2pValueCr: 2400000.00, p2mVolumeMn: 15686.00, p2mValueCr: 800000.00 },
];

export function processNPCIMonthlyData(): NPCIMonthlyDerivedRecord[] {
  return RAW_NPCI_MONTHLY_DATA.map((row, idx, arr) => {
    const p2pVolumeSharePct = (row.p2pVolumeMn / row.totalVolumeMn) * 100;
    const p2mVolumeSharePct = (row.p2mVolumeMn / row.totalVolumeMn) * 100;
    const p2pValueSharePct = (row.p2pValueCr / row.totalValueCr) * 100;
    const p2mValueSharePct = (row.p2mValueCr / row.totalValueCr) * 100;

    const avgTicketSizeTotalInr = (row.totalValueCr / row.totalVolumeMn) * 10;
    const avgTicketSizeP2PInr = (row.p2pValueCr / row.p2pVolumeMn) * 10;
    const avgTicketSizeP2MInr = (row.p2mValueCr / row.p2mVolumeMn) * 10;

    let momVolumeGrowthPct: number | null = null;
    let momValueGrowthPct: number | null = null;

    if (idx > 0) {
      const prev = arr[idx - 1];
      momVolumeGrowthPct = ((row.totalVolumeMn - prev.totalVolumeMn) / prev.totalVolumeMn) * 100;
      momValueGrowthPct = ((row.totalValueCr - prev.totalValueCr) / prev.totalValueCr) * 100;
    }

    return {
      ...row,
      p2pVolumeSharePct,
      p2mVolumeSharePct,
      p2pValueSharePct,
      p2mValueSharePct,
      avgTicketSizeTotalInr,
      avgTicketSizeP2PInr,
      avgTicketSizeP2MInr,
      momVolumeGrowthPct,
      momValueGrowthPct,
    };
  });
}

export const DERIVED_NPCI_MONTHLY_DATA = processNPCIMonthlyData();
