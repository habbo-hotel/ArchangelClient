import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BillingInvoice {
    id: number;
    userID: number;
    title: string;
    description: string;
    chargedByUserID: number;
    chargedByCorpID: number;
    amountOwed: number;
    amountPaid: number;
}

export class BillingInvoiceQueryEventParser implements IMessageParser {
    private _id: number;
    private _userID: number;
    private _title: string;
    private _description: string;
    private _chargedByUserID: number;
    private _chargedByCorpID: number;
    private _amountOwed: number;
    private _amountPaid: number;

    public flush(): boolean {
        this._id = -1;
        this._userID = -1;
        this._title = '';
        this._description = '';
        this._amountOwed = -1;
        this._amountPaid = -1;
        this._chargedByUserID = -1;
        this._chargedByCorpID = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._userID = wrapper.readInt();
        this._title = wrapper.readString();
        this._description = wrapper.readString();
        this._chargedByUserID = wrapper.readInt();
        this._chargedByUserID = wrapper.readInt();
        this._amountOwed = wrapper.readInt();
        this._amountPaid = wrapper.readInt();

        return true;
    }

    public get data(): BillingInvoice {
        return {
            id: this._id,
            userID: this._userID,
            title: this._title,
            description: this._description,
            chargedByCorpID: this._chargedByCorpID,
            chargedByUserID: this._chargedByUserID,
            amountOwed: this._amountOwed,
            amountPaid: this._amountPaid,
        }
    }
}
