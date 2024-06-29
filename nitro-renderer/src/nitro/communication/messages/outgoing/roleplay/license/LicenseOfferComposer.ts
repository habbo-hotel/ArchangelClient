import { IMessageComposer } from "../../../../../../api";
import { LicenseType } from "../../../parser/roleplay/license/LicenseStatusEventParser";

export class LicenseOfferComposer implements IMessageComposer<ConstructorParameters<typeof LicenseOfferComposer>> {
    private _data: ConstructorParameters<typeof LicenseOfferComposer>;

    constructor(username: string, licenseType: LicenseType) {
        this._data = [username, licenseType];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}