import { IMessageComposer } from "../../../../../../api";

export class UserAttackComposer implements IMessageComposer<ConstructorParameters<typeof UserAttackComposer>> {
    private _data: ConstructorParameters<typeof UserAttackComposer>;

    constructor(x: number, y: number) {
        this._data = [x, y];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}