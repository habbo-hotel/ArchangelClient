import { IMessageComposer } from "../../../../../../api";

export class CallPoliceComposer implements IMessageComposer<ConstructorParameters<typeof CallPoliceComposer>> {
    private _data: ConstructorParameters<typeof CallPoliceComposer>;

    constructor(message: string) {
        this._data = [message];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}