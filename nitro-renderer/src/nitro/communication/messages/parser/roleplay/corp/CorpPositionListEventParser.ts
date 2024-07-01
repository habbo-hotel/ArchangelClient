import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";


export class CorpPositionListEventParser implements IMessageParser {
    private _corpID: number;
    private _corpPositionIDs: Array<number>;

    public flush(): boolean {
        this._corpID = -1;
        this._corpPositionIDs = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._corpID = wrapper.readInt();
        const totalBanks = wrapper.readInt();

        for (let i = 0; i < totalBanks; i++) {
            this._corpPositionIDs.push(wrapper.readInt());
        }

        return true;
    }

    public get corpID(): number {
        return this._corpID;
    }

    public get corpPositionIDs(): Array<number> {
        return this._corpPositionIDs;
    }

}
