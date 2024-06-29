import { IMessageComposer } from "../../../../../../api";

export class LicenseConnectComputerComposer implements IMessageComposer<ConstructorParameters<typeof LicenseConnectComputerComposer>> {
    private _data: ConstructorParameters<typeof LicenseConnectComputerComposer>;

    constructor(itemID: number, corpID: number) {
        this._data = [itemID, corpID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}