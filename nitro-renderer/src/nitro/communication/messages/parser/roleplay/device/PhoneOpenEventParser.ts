import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class PhoneOpenEventParser implements IMessageParser {
    private _itemID: number;

    public flush(): boolean {
        this._itemID = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;
        this._itemID = wrapper.readInt();
        return true;
    }

    public get itemID(): number {
        return this._itemID;
    }
}
