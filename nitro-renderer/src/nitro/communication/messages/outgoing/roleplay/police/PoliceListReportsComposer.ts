import { IMessageComposer } from "../../../../../../api";

export class PoliceListReportsComposer implements IMessageComposer<ConstructorParameters<typeof PoliceListReportsComposer>> {
    private _data: ConstructorParameters<typeof PoliceListReportsComposer>;

    constructor(username?: string) {
        this._data = [username];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}