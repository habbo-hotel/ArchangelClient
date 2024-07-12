import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { DeviceOpenEventParser } from "../../../parser";

export class DeviceOpenEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, DeviceOpenEventParser);
    }

    public getParser(): DeviceOpenEventParser {
        return this.parser as DeviceOpenEventParser;
    }
}
