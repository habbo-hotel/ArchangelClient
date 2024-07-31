import { IMessageComposer } from "../../../../../../api";

export class TurfTimerQueryComposer implements IMessageComposer<ConstructorParameters<typeof TurfTimerQueryComposer>> {
    private _data: ConstructorParameters<typeof TurfTimerQueryComposer>;

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