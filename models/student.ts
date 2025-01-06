import { Address } from "./address";

export interface Student {
    name: string;
    age: number;
    dateOfBirth: string;
    fatherName: string;
    permanentAddress: Address;
    guardianName: string;
    mobileNumber: string;
    monthlyFee: number;
    currentAddress?: Address;
    class?: string;
    gender: string;
}

export interface StudentDisplay {
    name: string;
    age: number;
    dateOfBirth: string;
    fatherName: string;
    permanentAddress: string;
    guardianName: string;
    mobileNumber: string;
    monthlyFee: number;
    currentAddress?: string;
    class?: string;
    gender: string
}

export interface StudentDisplayList {
    id: number;
    name: string;
    age: number;
    date_of_birth: string;
    father_name: string;
    permanent_address: string;
    guardian_name: string;
    is_left: boolean;
    mobile_number: string;
    monthly_fee: number;
    current_address?: string;
    class?: string;
    gender: string;
}