import { IMessageComposer } from "../../../../../../api";

export class CorpCreatePositionComposer implements IMessageComposer<ConstructorParameters<typeof CorpCreatePositionComposer>> {
    private _data: ConstructorParameters<typeof CorpCreatePositionComposer>;

    constructor(corpID: number, orderID: number, name: string, motto: string, salary: number, maleUniform: string, femaleUniform: string, canHire: boolean, canFire: boolean, canPromote: boolean, canDemote: boolean, canWorkAnywhere: boolean) {
        this._data = [corpID, orderID, name, motto, salary, maleUniform, femaleUniform, canHire, canFire, canPromote, canDemote, canWorkAnywhere];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}