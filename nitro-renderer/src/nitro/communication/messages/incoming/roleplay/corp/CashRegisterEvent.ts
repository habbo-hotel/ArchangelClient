import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CashRegisterParser } from "../../../parser/roleplay/corp/CashRegisterParser";

export class CashRegisterEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CashRegisterParser);
    }

    public getParser(): CashRegisterParser {
        return this.parser as CashRegisterParser;
    }
}
