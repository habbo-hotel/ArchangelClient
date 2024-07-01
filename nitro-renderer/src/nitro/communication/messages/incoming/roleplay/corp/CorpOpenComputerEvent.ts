import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpOpenComputerEventParser } from "../../../parser";

export class CorpOpenComputerEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CorpOpenComputerEventParser);
    }

    public getParser(): CorpOpenComputerEventParser {
        return this.parser as CorpOpenComputerEventParser;
    }
}
