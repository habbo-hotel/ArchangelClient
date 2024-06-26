import { IMessageComposer } from "../../../../../../api";

export class BankListComposer implements IMessageComposer<ConstructorParameters<typeof BankListComposer>> {
    private _data: ConstructorParameters<typeof BankListComposer>;

    constructor() {
        this._data = [];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}