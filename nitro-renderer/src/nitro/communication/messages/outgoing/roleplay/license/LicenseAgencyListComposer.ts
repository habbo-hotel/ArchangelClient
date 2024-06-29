import { IMessageComposer } from "../../../../../../api";

export class LicenseAgencyListComposer implements IMessageComposer<ConstructorParameters<typeof LicenseAgencyListComposer>> {
    private _data: ConstructorParameters<typeof LicenseAgencyListComposer>;

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