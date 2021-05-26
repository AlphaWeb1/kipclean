export interface Transaction {
    id?: number;
    email?: string;
    reference: string;
    amount: number;
    status: string; // pending successful, failed
    gateway?: string; // paystack
    type: string; // funding, waste bin, waste disposal
    unit?: number;
    createdAt?: string;
    updatedAt?: string;
}
