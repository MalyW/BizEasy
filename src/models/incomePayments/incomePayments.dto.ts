export class IncomePaymentsDto {
    InvoiceNum!: string;
    paymentType?: string;
    sum!: number;
    Date?: Date;
    cardLastFourDigits?: number;
    paymentsNum?: number;
    chequeNumber?: number;
    cheqeBankName?: string;
    transferNumber?: number;
    transferBankName?: string;
}