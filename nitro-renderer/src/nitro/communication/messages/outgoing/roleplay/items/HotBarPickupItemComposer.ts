import { IMessageComposer } from "../../../../../../api";

export class HotBarAddItemComposer implements IMessageComposer<ConstructorParameters<typeof HotBarAddItemComposer>> {
    private _data: ConstructorParameters<typeof HotBarAddItemComposer>;

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