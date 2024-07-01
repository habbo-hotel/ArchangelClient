import { IMessageComposer } from "../../../../../../api";

export class CorpEmployeeListComposer implements IMessageComposer<ConstructorParameters<typeof CorpEmployeeListComposer>> {
    private _data: ConstructorParameters<typeof CorpEmployeeListComposer>;

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