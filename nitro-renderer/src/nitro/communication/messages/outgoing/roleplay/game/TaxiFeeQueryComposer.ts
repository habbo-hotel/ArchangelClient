import { IMessageComposer } from "../../../../../../api";

export class TaxiFeeQueryComposer implements IMessageComposer<ConstructorParameters<typeof TaxiFeeQueryComposer>> {
    private _data: ConstructorParameters<typeof TaxiFeeQueryComposer>;

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