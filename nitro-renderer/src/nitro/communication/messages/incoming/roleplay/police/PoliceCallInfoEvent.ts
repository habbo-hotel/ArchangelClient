import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { PoliceCallInfoEventParser } from "../../../parser";

export class PoliceCallInfoEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, PoliceCallInfoEventParser);
    }

    public getParser(): PoliceCallInfoEventParser {
        return this.parser as PoliceCallInfoEventParser;
    }
}
