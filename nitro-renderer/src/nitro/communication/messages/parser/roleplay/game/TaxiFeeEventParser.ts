import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class TaxiFeeEventParser implements IMessageParser {
    private _taxiFee: number;

    public flush(): boolean {
        this._taxiFee = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._taxiFee = wrapper.readInt();

        return true;
    }

    public get taxiFee(): number {
        return this._taxiFee;
    }
}
