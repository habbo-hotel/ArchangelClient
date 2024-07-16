import { IMessageComposer } from "../../../../../../api";

export class WantedListAddUserComposer implements IMessageComposer<ConstructorParameters<typeof WantedListAddUserComposer>> {
    private _data: ConstructorParameters<typeof WantedListAddUserComposer>;

    constructor(username: string, crime: string) {
        this._data = [username, crime];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}