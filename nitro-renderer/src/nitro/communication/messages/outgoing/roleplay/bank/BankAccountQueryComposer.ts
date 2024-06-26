import { IMessageComposer } from "../../../../../../api";

export class BankAccountQueryComposer implements IMessageComposer<ConstructorParameters<typeof BankAccountQueryComposer>> {
    private _data: ConstructorParameters<typeof BankAccountQueryComposer>;

    constructor(corpID: number, username: string) {
        this._data = [corpID, username];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}