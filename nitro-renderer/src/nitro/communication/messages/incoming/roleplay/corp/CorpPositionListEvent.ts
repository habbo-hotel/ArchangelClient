import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpPositionListEventParser } from "../../../parser";

export class CorpPositionListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CorpPositionListEventParser);
    }

    public getParser(): CorpPositionListEventParser {
        return this.parser as CorpPositionListEventParser;
    }
}
