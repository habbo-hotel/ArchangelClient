import { IMessageComposer } from "../../../../../../api";

export class WantedListRemoveUserComposer implements IMessageComposer<ConstructorParameters<typeof WantedListRemoveUserComposer>> {
    private _data: ConstructorParameters<typeof WantedListRemoveUserComposer>;

    constructor(username: string) {
        this._data = [username];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}