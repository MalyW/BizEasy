export class ExpenseDto {
    ReferenceNumber!: number;
    Date!: Date;
    SupplierId!: string;
    CategoryId!: string;
    Amount!: number;
    VAT?: number;
    PaymentType!: "Cash" | "CreditCard" | "Cheque" | "BankTransfer";
    Description?: string;
    FileUrl?: string;
}