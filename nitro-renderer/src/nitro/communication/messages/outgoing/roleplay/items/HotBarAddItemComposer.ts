import { IMessageComposer } from "../../../../../../api";

export class HotBarPickupItemComposer implements IMessageComposer<ConstructorParameters<typeof HotBarPickupItemComposer>> {
    private _data: ConstructorParameters<typeof HotBarPickupItemComposer>;

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