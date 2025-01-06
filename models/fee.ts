export interface Fees{
    amount: number;
    monthName: string;
    year: string;
    userId: string;
}

export interface FeesOut {
    id: string;
    amount: number;
    month_name: string;
    year: string;
    user_id: string;
    created_at: string;
}

export interface FeesStudent {
    name: string;
    id: number;
    monthly_fee: number;
    guardian_name: string;
    mobile_number: string;
}

export interface FeesDetails {
    allPaidStudent: FeesStudent[];
    allUnPaidStudent: FeesStudent[];
    total: string;
    paidAmount: string;
    unpaidAmount: string;
    totalStudent: number
}