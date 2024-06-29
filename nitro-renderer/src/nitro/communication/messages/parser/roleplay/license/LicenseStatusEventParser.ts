import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export enum LicenseType {
    DRIVER = 1,
    FARMING = 2,
    FISHING = 3,
    MINING = 4,
    WEAPON = 5,
}

export interface LicenseStatusData {
    licenseType: LicenseType;
    licenseIsValid: boolean;
}

export class LicenseStatusEventParser implements IMessageParser {
    private _licenseType: LicenseType;
    private _licenseIsValid: boolean;

    public flush(): boolean {
        this._licenseType = LicenseType.DRIVER;
        this._licenseIsValid = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._licenseType = wrapper.readInt();
        this._licenseIsValid = wrapper.readBoolean();

        return true;
    }

    public get data(): LicenseStatusData {
        return {
            licenseType: this._licenseType,
            licenseIsValid: this._licenseIsValid,
        }
    }
}
