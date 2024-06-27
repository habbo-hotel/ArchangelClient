import { IMessageComposer } from "../../../../../../api";

export class RoomListUsersComposer implements IMessageComposer<ConstructorParameters<typeof RoomListUsersComposer>> {
    private _data: ConstructorParameters<typeof RoomListUsersComposer>;

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