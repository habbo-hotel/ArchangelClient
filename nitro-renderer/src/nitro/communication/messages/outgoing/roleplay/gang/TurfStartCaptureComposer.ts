import { IMessageComposer } from "../../../../../../api";

export class TurfStartCaptureComposer implements IMessageComposer<ConstructorParameters<typeof TurfStartCaptureComposer>> {
    private _data: ConstructorParameters<typeof TurfStartCaptureComposer>;

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