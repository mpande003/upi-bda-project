import { CorrelationResult } from '../types/npci';

/**
 * Calculates Pearson Correlation Coefficient (r)
 */
export function calculatePearson(x: number[], y: number[]): number {
  const n = x.length;
  if (n < 2) return 0;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const den = Math.sqrt(denX * denY);
  if (den === 0) return 0;
  return num / den;
}

/**
 * Helper to convert array of numbers into ranks (handling ties by average rank)
 */
function getRanks(arr: number[]): number[] {
  const sorted = arr.map((val, idx) => ({ val, idx })).sort((a, b) => a.val - b.val);
  const ranks = new Array(arr.length);
  
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j < sorted.length && sorted[j].val === sorted[i].val) {
      j++;
    }
    const rankAvg = (i + 1 + j) / 2;
    for (let k = i; k < j; k++) {
      ranks[sorted[k].idx] = rankAvg;
    }
    i = j;
  }
  return ranks;
}

/**
 * Calculates Spearman Rank Correlation Coefficient (rho)
 */
export function calculateSpearman(x: number[], y: number[]): number {
  if (x.length < 2) return 0;
  const rankX = getRanks(x);
  const rankY = getRanks(y);
  return calculatePearson(rankX, rankY);
}

/**
 * Performs Ordinary Least Squares (OLS) Linear Regression
 */
export function calculateLinearRegression(x: number[], y: number[]): { slope: number; intercept: number; rSquared: number } {
  const n = x.length;
  if (n < 2) return { slope: 0, intercept: 0, rSquared: 0 };

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let num = 0;
  let denX = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
  }

  const slope = denX !== 0 ? num / denX : 0;
  const intercept = meanY - slope * meanX;
  const r = calculatePearson(x, y);
  const rSquared = r * r;

  return { slope, intercept, rSquared };
}

/**
 * Calculates full correlation analysis between two variables
 */
export function analyzeCorrelation(
  x: number[],
  y: number[],
  xName: string,
  yName: string
): CorrelationResult {
  const n = x.length;
  const pearsonR = calculatePearson(x, y);
  const spearmanRho = calculateSpearman(x, y);
  const { slope, intercept, rSquared } = calculateLinearRegression(x, y);

  let Strength = 'negligible';
  const absR = Math.abs(pearsonR);
  if (absR >= 0.9) Strength = 'very strong';
  else if (absR >= 0.7) Strength = 'strong';
  else if (absR >= 0.5) Strength = 'moderate';
  else if (absR >= 0.3) Strength = 'weak';

  const direction = pearsonR >= 0 ? 'positive' : 'negative';

  const interpretation = `Based on N=${n} observations, ${xName} and ${yName} exhibit a ${Strength} ${direction} linear correlation (Pearson r = ${pearsonR.toFixed(3)}, Spearman ρ = ${spearmanRho.toFixed(3)}, R² = ${(rSquared * 100).toFixed(1)}%). Note: Correlation indicates statistical association across temporal development phases, not direct causality.`;

  return {
    pearsonR,
    spearmanRho,
    rSquared,
    slope,
    intercept,
    sampleSize: n,
    interpretation,
  };
}

// Formatting helpers
export function formatNumber(val: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

export function formatVolume(valMn: number): string {
  if (valMn >= 1000) {
    return `${formatNumber(valMn / 1000, 2)} B`; // Billion
  }
  return `${formatNumber(valMn, 2)} Mn`;
}

export function formatCurrencyCr(valCr: number): string {
  if (valCr >= 100000) {
    return `₹${formatNumber(valCr / 100000, 2)} Lakh Cr`;
  }
  return `₹${formatNumber(valCr, 2)} Cr`;
}

export function formatInr(valInr: number): string {
  return `₹${formatNumber(valInr, 2)}`;
}

export function formatPercent(valPct: number | null, includeSign: boolean = true): string {
  if (valPct === null || isNaN(valPct)) return '-';
  const sign = includeSign && valPct > 0 ? '+' : '';
  return `${sign}${formatNumber(valPct, 2)}%`;
}
