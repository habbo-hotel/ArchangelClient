import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BankListEventParser } from "../../../parser";

export class BankListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BankListEventParser);
    }

    public getParser(): BankListEventParser {
        return this.parser as BankListEventParser;
    }
}
