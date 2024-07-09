import { IMessageComposer } from "../../../../../../api";

export class DeviceOpenComposer implements IMessageComposer<ConstructorParameters<typeof DeviceOpenComposer>> {
    private _data: ConstructorParameters<typeof DeviceOpenComposer>;

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