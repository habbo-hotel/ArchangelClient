import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpEmployeeListEventParser } from "../../../parser";

export class CorpEmployeeListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CorpEmployeeListEventParser);
    }

    public getParser(): CorpEmployeeListEventParser {
        return this.parser as CorpEmployeeListEventParser;
    }
}
