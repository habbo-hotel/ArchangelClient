import { IMessageComposer } from "../../../../../../api";

export class BankAccountDepositComposer implements IMessageComposer<ConstructorParameters<typeof BankAccountDepositComposer>> {
    private _data: ConstructorParameters<typeof BankAccountDepositComposer>;

    constructor(corpID: number, depositAmount: number) {
        this._data = [corpID, depositAmount];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}