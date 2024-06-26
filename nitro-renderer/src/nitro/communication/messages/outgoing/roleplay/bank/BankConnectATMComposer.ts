import { IMessageComposer } from "../../../../../../api";

export class BankConnectATMComposer implements IMessageComposer<ConstructorParameters<typeof BankConnectATMComposer>> {
    private _data: ConstructorParameters<typeof BankConnectATMComposer>;

    constructor(itemID: number, corpID: number) {
        this._data = [itemID, corpID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}