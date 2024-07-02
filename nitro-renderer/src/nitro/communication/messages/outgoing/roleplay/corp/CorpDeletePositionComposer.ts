import { IMessageComposer } from "../../../../../../api";

export class CorpDeletePositionComposer implements IMessageComposer<ConstructorParameters<typeof CorpDeletePositionComposer>> {
    private _data: ConstructorParameters<typeof CorpDeletePositionComposer>;

    constructor(corpID: number, corpPositionID: number) {
        this._data = [corpID, corpPositionID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}