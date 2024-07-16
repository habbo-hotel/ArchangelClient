import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface UserArrestedData {
    userId: number;
    username: string;
    look: string;
    arrestedById: number;
    arrestedByUsername: string;
    arrestedByLook: string;
}

export class UserArrestedEventParser implements IMessageParser {
    private _userId: number;
    private _username: string;
    private _look: string;
    private _arrestedById: number;
    private _arrestedByUsername: string;
    private _arrestedByLook: string;

    public flush(): boolean {
        this._userId = -1;
        this._username = '';
        this._look = '-';
        this._arrestedById = -1;
        this._arrestedByUsername = '';
        this._arrestedByLook = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false

        this._userId = wrapper.readInt();
        this._username = wrapper.readString();
        this._look = wrapper.readString();
        this._arrestedById = wrapper.readInt();
        this._arrestedByUsername = wrapper.readString();
        this._arrestedByLook = wrapper.readString();
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

    public get arrestedById(): number {
        return this._arrestedById;
    }

    public get arrestedByUsername(): string {
        return this._arrestedByUsername;
    }

    public get arrestedByLook(): string {
        return this._arrestedByLook;
    }

}
