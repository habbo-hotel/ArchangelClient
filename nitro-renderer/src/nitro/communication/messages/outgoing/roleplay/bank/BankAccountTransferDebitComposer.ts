import { IMessageComposer } from "../../../../../../api";

export class BankAccountTransferDebitComposer implements IMessageComposer<ConstructorParameters<typeof BankAccountTransferDebitComposer>> {
    private _data: ConstructorParameters<typeof BankAccountTransferDebitComposer>;

    constructor(corpID: number, transferAmount: number) {
        this._data = [corpID, transferAmount];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}