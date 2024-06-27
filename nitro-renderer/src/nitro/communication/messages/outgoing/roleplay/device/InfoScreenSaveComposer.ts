import { IMessageComposer } from "../../../../../../api";

export class InfoScreenSaveComposer implements IMessageComposer<ConstructorParameters<typeof InfoScreenSaveComposer>> {
    private _data: ConstructorParameters<typeof InfoScreenSaveComposer>;

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