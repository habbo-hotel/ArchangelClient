import { IMessageComposer } from "../../../../../../api";

export class CorpListComposer implements IMessageComposer<ConstructorParameters<typeof CorpListComposer>> {
    private _data: ConstructorParameters<typeof CorpListComposer>;

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