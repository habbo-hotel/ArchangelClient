import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { TaxiFeeEventParser } from "../../../parser/roleplay/taxi/TaxiFeeEventParser";

export class TaxiFeeQueryEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, TaxiFeeEventParser);
    }

    public getParser(): TaxiFeeEventParser {
        return this.parser as TaxiFeeEventParser;
    }
}
