import { FeesStudent } from "./fee";

export interface DashboardData {
    totalStudents: number;
    newStudents: number;
    currentMonthTotalFee: number;
    currentMonthPaidFee: number;
    currentMonthUnpaidFee: number;
    paidStudents: number;
    unpaidStudents: number;
    monthlyOverview: MonthlyOverview[];
    currentMonthUnpaidStudents: FeesStudent[]
}

export interface MonthlyOverview {
    month_name: string;
    year: string;
    paidFee: string;
}