import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { InfoScreenViewEventParser } from "../../../parser";

export class InfoScreenViewEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, InfoScreenViewEventParser);
    }

    public getParser(): InfoScreenViewEventParser {
        return this.parser as InfoScreenViewEventParser;
    }
}
