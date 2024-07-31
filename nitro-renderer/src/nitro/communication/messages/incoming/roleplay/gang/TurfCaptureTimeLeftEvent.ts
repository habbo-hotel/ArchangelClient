import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { TurfCaptureTimeLeftEventParser } from "../../../parser";

export class TurfCaptureTimeLeftEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, TurfCaptureTimeLeftEventParser);
    }
    public getParser(): TurfCaptureTimeLeftEventParser {
        return this.parser as TurfCaptureTimeLeftEventParser;
    }
}
