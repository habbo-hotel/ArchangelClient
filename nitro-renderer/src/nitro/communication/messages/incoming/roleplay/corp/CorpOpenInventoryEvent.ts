import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpOpenInventoryParser } from "../../../parser";

export class CorpOpenInventoryEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CorpOpenInventoryParser);
    }

    public getParser(): CorpOpenInventoryParser {
        return this.parser as CorpOpenInventoryParser;
    }
}
