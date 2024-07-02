import { IMessageComposer } from "../../../../../../api";

export class CorpEditPositionComposer implements IMessageComposer<ConstructorParameters<typeof CorpEditPositionComposer>> {
    private _data: ConstructorParameters<typeof CorpEditPositionComposer>;

    constructor(corpID: number, corpPositionID: number, name: string, motto: string, salary: number, maleUniform: string, femaleUniform: string, canHire: boolean, canFire: boolean, canPromote: boolean, canDemote: boolean, canWorkAnywhere: boolean) {
        this._data = [corpID, corpPositionID, name, motto, salary, maleUniform, femaleUniform, canHire, canFire, canPromote, canDemote, canWorkAnywhere];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}