import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BankAccountData {
    corpID: number;
    userID: number;
    checkingBalance: number;
    createdAt: number;
    updatedAt: number;
}

export class BankAccountInfoEventParser implements IMessageParser {
    private _corpID: number;
    private _userID: number;
    private _checkingBalance: number;
    private _createdAt: number;
    private _updatedAt: number;

    public flush(): boolean {
        this._corpID = -1;
        this._userID = -1;
        this._checkingBalance = 0;
        this._createdAt = 0;
        this._updatedAt = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._corpID = wrapper.readInt();
        this._userID = wrapper.readInt();
        this._checkingBalance = wrapper.readInt();
        this._createdAt = wrapper.readInt();
        this._updatedAt = wrapper.readInt();

        return true;
    }

    public get data(): BankAccountData {
        return {
            corpID: this._corpID,
            userID: this._userID,
            checkingBalance: this._checkingBalance,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        }
    }
}
