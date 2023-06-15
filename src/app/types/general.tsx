export type receiptUser = {
    name: string;
    payments: number[];
    total: number;
    tax: number;
    percentOfTotal: number;
};

export type ProcessResponseObject = { code: number; msg: string };
