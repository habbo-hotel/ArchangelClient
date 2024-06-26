import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BankListRow {
    corpID: number;
    corpName: string;
}

export class BankListEventParser implements IMessageParser {
    private _banks: Array<BankListRow> = [];

    public flush(): boolean {
        this._banks = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalBanks = wrapper.readInt();

        for (let i = 0; i < totalBanks; i++) {
            const [corpID, corpName] = wrapper.readString().split(';');
            this._banks.push({ corpID: Number(corpID), corpName });
        }

        return true;
    }

    public get banks(): Array<BankListRow> {
        return this._banks;
    }

}
