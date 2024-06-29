import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { LicenseAgencyListEventParser } from "../../../parser";

export class LicenseAgencyListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, LicenseAgencyListEventParser);
    }

    public getParser(): LicenseAgencyListEventParser {
        return this.parser as LicenseAgencyListEventParser;
    }
}
