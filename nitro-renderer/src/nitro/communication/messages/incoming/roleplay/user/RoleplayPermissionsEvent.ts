import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { RoleplayPermissionsEventParser } from "../../../parser";

export class RoleplayPermissionsEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, RoleplayPermissionsEventParser);
    }

    public getParser(): RoleplayPermissionsEventParser {
        return this.parser as RoleplayPermissionsEventParser;
    }
}
