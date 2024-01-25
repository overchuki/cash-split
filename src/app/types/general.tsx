export type ProcessResponseObject = { code: number; msg: string };

export type ReceiptItem = {
    amount: number;
    description?: string;
};

export type ReceiptItemData = ReceiptItem[];
