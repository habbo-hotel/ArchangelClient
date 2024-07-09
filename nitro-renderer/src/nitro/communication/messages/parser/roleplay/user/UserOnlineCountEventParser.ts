import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class UserOnlineCountEventParser implements IMessageParser {
    private _onlineUsers: number;

    public flush(): boolean {
        this._onlineUsers = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._onlineUsers = wrapper.readInt();

        return true;
    }

    public get onlineUsers(): number {
        return this._onlineUsers;
    }
}
