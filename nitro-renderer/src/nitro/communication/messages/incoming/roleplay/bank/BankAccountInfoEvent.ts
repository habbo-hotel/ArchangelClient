import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BankAccountInfoEventParser } from "../../../parser";

export class BankAccountInfoEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BankAccountInfoEventParser);
    }

    public getParser(): BankAccountInfoEventParser {
        return this.parser as BankAccountInfoEventParser;
    }
}
