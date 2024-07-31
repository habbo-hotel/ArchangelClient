import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { TurfContextMenuInfoEventParser } from "../../../parser/roleplay/gang/TurfContextMenuInfoEventParser";

export class TurfContextMenuInfoEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, TurfContextMenuInfoEventParser);
    }

    public getParser(): TurfContextMenuInfoEventParser {
        return this.parser as TurfContextMenuInfoEventParser;
    }
}
