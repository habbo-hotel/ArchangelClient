import { IMessageComposer } from "../../../../../../api";

export class RoleplayPermissionsComposer implements IMessageComposer<ConstructorParameters<typeof RoleplayPermissionsComposer>> {
    private _data: ConstructorParameters<typeof RoleplayPermissionsComposer>;

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