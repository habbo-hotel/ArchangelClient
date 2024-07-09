import { IMessageComposer } from "../../../../../../api";

export class DeviceCloseComposer implements IMessageComposer<ConstructorParameters<typeof DeviceCloseComposer>> {
    private _data: ConstructorParameters<typeof DeviceCloseComposer>;

    constructor(itemID: number) {
        this._data = [itemID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}