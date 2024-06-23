import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { TaxiDispatchedEventParser } from "../../../parser";

export class TaxiDispatchedEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, TaxiDispatchedEventParser);
    }

    public getParser(): TaxiDispatchedEventParser {
        return this.parser as TaxiDispatchedEventParser;
    }
}
