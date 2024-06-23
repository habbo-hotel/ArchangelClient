import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class TaxiDispatchedEventParser implements IMessageParser {
    private _roomID: number;
    private _arrivesAt: number;

    public flush(): boolean {
        this._roomID = 0;
        this._arrivesAt = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._roomID = wrapper.readInt();
        this._arrivesAt = wrapper.readInt();

        return true;
    }

    public get roomID(): number {
        return this._roomID;
    }

    public get arrivesAt(): number {
        return this._arrivesAt;
    }
}
