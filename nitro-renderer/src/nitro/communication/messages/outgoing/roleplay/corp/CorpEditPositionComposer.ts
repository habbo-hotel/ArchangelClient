import { IMessageComposer } from "../../../../../../api";

export class CorpEditPositionComposer implements IMessageComposer<ConstructorParameters<typeof CorpEditPositionComposer>> {
    private _data: ConstructorParameters<typeof CorpEditPositionComposer>;

    constructor(corpID: number, corpPositionID: number, name: string, motto: string, salary: number, maleUniform: string, femaleUniform: string) {
        this._data = [corpID, corpPositionID, name, motto, salary, maleUniform, femaleUniform];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}