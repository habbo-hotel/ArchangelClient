import { IMessageComposer } from "../../../../../../api";

export class UserOnlineCountComposer implements IMessageComposer<ConstructorParameters<typeof UserOnlineCountComposer>> {
    private _data: ConstructorParameters<typeof UserOnlineCountComposer>;

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