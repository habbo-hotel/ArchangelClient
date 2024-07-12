import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { PoliceListReportsEventParser } from "../../../parser";

export class PoliceListReportsEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, PoliceListReportsEventParser);
    }

    public getParser(): PoliceListReportsEventParser {
        return this.parser as PoliceListReportsEventParser;
    }
}
