export class IncomeDto {
    InvoiceNumber!: number;
    CustomerId!: string;
    InvoiceDate!: Date;
    PrintDate!: Date;
    Amount!: number;
    VAT?: number;
    Description?: string;
    payments?: string[];
    fileUrl?: string;
}