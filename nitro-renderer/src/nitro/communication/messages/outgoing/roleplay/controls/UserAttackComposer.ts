import { IMessageComposer } from "../../../../../../api";

export class UserAttackComposer implements IMessageComposer<ConstructorParameters<typeof UserAttackComposer>> {
    private _data: ConstructorParameters<typeof UserAttackComposer>;

    constructor(x: number, y: number, z: number) {
        this._data = [x, y, z];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}