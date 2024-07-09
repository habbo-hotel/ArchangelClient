import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { PhoneOpenEventParser } from "../../../parser";

export class PhoneOpenEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, PhoneOpenEventParser);
    }

    public getParser(): PhoneOpenEventParser {
        return this.parser as PhoneOpenEventParser;
    }
}
