import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { TaxiFeeEventParser } from "../../../parser/roleplay/game/TaxiFeeEventParser";

export class TaxiFeeEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, TaxiFeeEventParser);
    }

    public getParser(): TaxiFeeEventParser {
        return this.parser as TaxiFeeEventParser;
    }
}
