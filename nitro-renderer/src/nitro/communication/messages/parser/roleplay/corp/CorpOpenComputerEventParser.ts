import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class CorpOpenComputerEventParser implements IMessageParser {
    private _itemID: number;
    private _corpID: number;

    public flush(): boolean {
        this._itemID = 0;
        this._corpID = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;
        this._itemID = wrapper.readInt();
        this._corpID = wrapper.readInt();
        return true;
    }

    public get itemID(): number {
        return this._itemID;
    }

    public get corpID(): number {
        return this._corpID;
    }
}
