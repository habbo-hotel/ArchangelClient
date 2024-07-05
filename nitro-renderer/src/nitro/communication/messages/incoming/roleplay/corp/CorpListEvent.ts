import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpListEventParser } from "../../../parser";

export class CorpListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CorpListEventParser);
    }

    public getParser(): CorpListEventParser {
        return this.parser as CorpListEventParser;
    }
}
