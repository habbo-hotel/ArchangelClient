import { IMessageComposer } from "../../../../../../api";
import { LicenseType } from "../../../parser/roleplay/license/LicenseStatusEventParser";

export class LicenseStatusQueryComposer implements IMessageComposer<ConstructorParameters<typeof LicenseStatusQueryComposer>> {
    private _data: ConstructorParameters<typeof LicenseStatusQueryComposer>;

    constructor(licenseType: LicenseType, userID: number) {
        this._data = [licenseType, userID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}