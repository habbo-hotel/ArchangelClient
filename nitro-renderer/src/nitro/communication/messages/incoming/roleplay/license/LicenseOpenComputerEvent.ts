import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { LicenseOpenComputerEventParser } from "../../../parser";

export class LicenseOpenComputerEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, LicenseOpenComputerEventParser);
    }

    public getParser(): LicenseOpenComputerEventParser {
        return this.parser as LicenseOpenComputerEventParser;
    }
}
