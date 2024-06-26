import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BankOpenATMEventParser } from "../../../parser";

export class BankOpenComputerEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BankOpenATMEventParser);
    }

    public getParser(): BankOpenATMEventParser {
        return this.parser as BankOpenATMEventParser;
    }
}
