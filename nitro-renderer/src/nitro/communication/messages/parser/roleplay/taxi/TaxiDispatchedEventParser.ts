import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class TaxiDispatchedEventParser implements IMessageParser {
    private _arrivesAt: number;

    public flush(): boolean {
        this._arrivesAt = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._arrivesAt = wrapper.readInt();

        return true;
    }

    public get arrivesAt(): number {
        return this._arrivesAt;
    }
}
