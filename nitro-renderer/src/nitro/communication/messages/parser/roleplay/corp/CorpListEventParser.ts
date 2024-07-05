import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpListData {
    id: number;
    name: string;
}

export class CorpListEventParser implements IMessageParser {
    private _corps: CorpListData[];

    public flush(): boolean {
        this._corps = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalCorps = wrapper.readInt();

        for (let i = 0; i < totalCorps; i++) {
            const [id, name] = wrapper.readString().split(';');
            this._corps.push({ id: Number(id), name })
        }

        return true;
    }

    public get corps(): CorpListData[] {
        return this._corps;
    }

}