import { IMessageComposer } from "../../../../../../api";

export class WeaponReloadComposer implements IMessageComposer<ConstructorParameters<typeof WeaponReloadComposer>> {
    private _data: ConstructorParameters<typeof WeaponReloadComposer>;

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