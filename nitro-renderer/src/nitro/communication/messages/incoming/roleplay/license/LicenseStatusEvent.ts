import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { LicenseStatusEventParser } from "../../../parser";

export class LicenseStatusEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, LicenseStatusEventParser);
    }

    public getParser(): LicenseStatusEventParser {
        return this.parser as LicenseStatusEventParser;
    }
}
