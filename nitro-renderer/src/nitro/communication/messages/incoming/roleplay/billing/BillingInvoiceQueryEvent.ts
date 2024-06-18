import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BillingInvoiceQueryEventParser } from "../../../parser/roleplay/billing/BillingInvoiceQueryEventParser";

export class BillingInvoiceQueryEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BillingInvoiceQueryEventParser);
    }

    public getParser(): BillingInvoiceQueryEventParser {
        return this.parser as BillingInvoiceQueryEventParser;
    }
}
