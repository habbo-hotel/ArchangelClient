import { IMessageComposer } from "../../../../../../api";

export class BankConnectComputerComposer implements IMessageComposer<ConstructorParameters<typeof BankConnectComputerComposer>> {
    private _data: ConstructorParameters<typeof BankConnectComputerComposer>;

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