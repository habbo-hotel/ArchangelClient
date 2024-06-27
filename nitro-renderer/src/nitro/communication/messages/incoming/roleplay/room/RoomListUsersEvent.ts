import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { RoomUsersListEventParser } from "../../../parser/roleplay/room/RoomListUsersEventParser";

export class RoomListUsersEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, RoomUsersListEventParser);
    }

    public getParser(): RoomUsersListEventParser {
        return this.parser as RoomUsersListEventParser;
    }
}
