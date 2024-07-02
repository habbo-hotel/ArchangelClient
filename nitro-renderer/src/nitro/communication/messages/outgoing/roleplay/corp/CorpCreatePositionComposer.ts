import { IMessageComposer } from "../../../../../../api";

export class CorpCreatePositionComposer implements IMessageComposer<ConstructorParameters<typeof CorpCreatePositionComposer>> {
    private _data: ConstructorParameters<typeof CorpCreatePositionComposer>;

    constructor(corpID: number, name: string, motto: string, salary: number, orderID: number, maleUniform: string, femaleUniform: string, canHire: boolean, canFire: boolean, canPromote: boolean, canDemote: boolean, canWorkAnywhere: boolean) {
        this._data = [corpID, name, motto, salary, orderID, maleUniform, femaleUniform, canHire, canFire, canPromote, canDemote, canWorkAnywhere];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}