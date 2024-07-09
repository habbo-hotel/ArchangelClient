import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { UserOnlineCountEventParser } from "../../../parser";

export class UserOnlineCountEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, UserOnlineCountEventParser);
    }

    public getParser(): UserOnlineCountEventParser {
        return this.parser as UserOnlineCountEventParser;
    }
}
