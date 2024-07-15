import { IMessageComposer } from "../../../../../../api";

export class HotBarListItemsComposer implements IMessageComposer<ConstructorParameters<typeof HotBarListItemsComposer>> {
    private _data: ConstructorParameters<typeof HotBarListItemsComposer>;

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