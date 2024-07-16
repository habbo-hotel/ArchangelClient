import { IMessageComposer } from "../../../../../../api";

export class WantedListQueryComposer implements IMessageComposer<ConstructorParameters<typeof WantedListQueryComposer>> {
    private _data: ConstructorParameters<typeof WantedListQueryComposer>;

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