import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { UserArrestedEventParser } from "../../../parser";

export class UserArrestedEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, UserArrestedEventParser);
    }

    public getParser(): UserArrestedEventParser {
        return this.parser as UserArrestedEventParser;
    }
}
