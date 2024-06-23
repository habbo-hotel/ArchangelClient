import { IMessageComposer } from "../../../../../../api";

export class CallTaxiComposer implements IMessageComposer<ConstructorParameters<typeof CallTaxiComposer>> {
    private _data: ConstructorParameters<typeof CallTaxiComposer>;

    constructor(roomID: number) {
        this._data = [roomID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}