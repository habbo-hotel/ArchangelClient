import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { UserDiedEventParser } from "../../../parser";

export class UserDiedEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, UserDiedEventParser);
    }

    public getParser(): UserDiedEventParser {
        return this.parser as UserDiedEventParser;
    }
}
