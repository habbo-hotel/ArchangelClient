import { IMessageComposer } from "../../../../../../api";

export class CorpPositionListComposer implements IMessageComposer<ConstructorParameters<typeof CorpPositionListComposer>> {
    private _data: ConstructorParameters<typeof CorpPositionListComposer>;

    constructor(corpID: number) {
        this._data = [corpID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}