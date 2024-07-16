import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { WantedListEventParser } from "../../../parser";

export class WantedListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, WantedListEventParser);
    }

    public getParser(): WantedListEventParser {
        return this.parser as WantedListEventParser;
    }
}
