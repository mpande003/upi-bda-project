/**
 * PhonePe Pulse Dataset Types
 */

export interface PhonePeAggTransRecord {
  state: string;
  year: number;
  quater: number;
  transactionType: string;
  transactionCount: number;
  transactionAmount: number;
}

export interface PhonePeMapTransRecord {
  state: string;
  district: string;
  year: number;
  quater: number;
  transactionCount: number;
  transactionAmount: number;
}

export interface PhonePeTopTransRecord {
  state: string;
  district: string;
  pincode: string;
  year: number;
  quater: number;
  transDistCount: number;
  transDistAmount: number;
  transPincodeCount: number;
  transPincodeAmount: number;
}
