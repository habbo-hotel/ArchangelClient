import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpPositionInfoParser } from "../../../parser";

export class CorpPositionInfoQueryEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CorpPositionInfoParser);
    }

    public getParser(): CorpPositionInfoParser {
        return this.parser as CorpPositionInfoParser;
    }
}
