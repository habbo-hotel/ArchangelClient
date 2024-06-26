import { IMessageComposer } from "../../../../../../api";

export class BankAccountWithdrawComposer implements IMessageComposer<ConstructorParameters<typeof BankAccountWithdrawComposer>> {
    private _data: ConstructorParameters<typeof BankAccountWithdrawComposer>;

    constructor(corpID: number, withdrawAmount: number) {
        this._data = [corpID, withdrawAmount];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}