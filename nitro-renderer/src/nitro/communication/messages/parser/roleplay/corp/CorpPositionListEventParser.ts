import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpPositionListData {
    id: number;
    name: string;
    salary: number;
    maleFigure: string;
    femaleFigure: string;
}

export class CorpPositionListEventParser implements IMessageParser {
    private _corpID: number;
    private _corpPositions: CorpPositionListData[];

    public flush(): boolean {
        this._corpID = -1;
        this._corpPositions = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._corpID = wrapper.readInt();
        const totalPositions = wrapper.readInt();

        for (let i = 0; i < totalPositions; i++) {
            const [id, name, salary, maleFigure, femaleFigure] = wrapper.readString().split(';');
            this._corpPositions.push({ id: Number(id), name, salary: Number(salary), maleFigure, femaleFigure })
        }

        return true;
    }

    public get corpID(): number {
        return this._corpID;
    }

    public get corpPositions(): CorpPositionListData[] {
        return this._corpPositions;
    }

}