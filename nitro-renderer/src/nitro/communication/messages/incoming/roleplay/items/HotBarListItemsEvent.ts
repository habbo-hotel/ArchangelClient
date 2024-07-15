import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { HotBarListItemsEventParser } from "../../../parser/roleplay/items/HotBarListItemsEventParser";

export class HotBarListItemsEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, HotBarListItemsEventParser);
    }

    public getParser(): HotBarListItemsEventParser {
        return this.parser as HotBarListItemsEventParser;
    }
}
