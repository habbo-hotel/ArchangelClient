import { IMessageComposer } from "../../../../../../api";

export class CorpSuperhireComposer implements IMessageComposer<ConstructorParameters<typeof CorpSuperhireComposer>> {
    private _data: ConstructorParameters<typeof CorpSuperhireComposer>;

    constructor(username: string, corpID: number, corpPositionID: number) {
        this._data = [username, corpID, corpPositionID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}