import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface UserDiedData {
    userId: number;
    username: string;
    look: string;
    killedById: number;
    killedByUsername: string;
    killedByLook: string;
}

export class UserDiedEventParser implements IMessageParser {
    private _userId: number;
    private _username: string;
    private _look: string;
    private _killedById: number;
    private _killedByUsername: string;
    private _killedByLook: string;

    public flush(): boolean {
        this._userId = -1;
        this._username = '';
        this._look = '-';
        this._killedById = -1;
        this._killedByUsername = '';
        this._killedByLook = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false

        this._userId = wrapper.readInt();
        this._username = wrapper.readString();
        this._look = wrapper.readString();
        this._killedById = wrapper.readInt();
        this._killedByUsername = wrapper.readString();
        this._killedByLook = wrapper.readString();
        return true;
    }

    public get userId(): number {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get look(): string {
        return this._look;
    }

    public get killedById(): number {
        return this._killedById;
    }

    public get killedByUsername(): string {
        return this._killedByUsername;
    }

    public get killedByLook(): string {
        return this._killedByLook;
    }

}
