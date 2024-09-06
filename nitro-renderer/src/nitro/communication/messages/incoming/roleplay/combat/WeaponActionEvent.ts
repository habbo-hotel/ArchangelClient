import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { WeaponActionEventParser } from "../../../parser";

export class WeaponActionEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, WeaponActionEventParser);
    }

    public getParser(): WeaponActionEventParser {
        return this.parser as WeaponActionEventParser;
    }
}
