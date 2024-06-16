import { IMessageComposer } from "../../../../../../api";

export class CombatDelayComposer implements IMessageComposer<ConstructorParameters<typeof CombatDelayComposer>> {
    private _data: ConstructorParameters<typeof CombatDelayComposer>;

    constructor() {
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}