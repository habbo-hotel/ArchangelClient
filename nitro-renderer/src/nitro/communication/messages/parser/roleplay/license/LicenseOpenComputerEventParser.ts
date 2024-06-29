import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { LicenseType } from "./LicenseStatusEventParser";

export interface LicenseComputerData {
    itemID: number;
    corpID: number | null;
    licenseType: LicenseType | null;
}

export class LicenseOpenComputerEventParser implements IMessageParser {
    private _itemID: number;
    private _corpID: number;
    private _licenseType: LicenseType;

    public flush(): boolean {
        this._itemID = 0;
        this._corpID = 0;
        this._licenseType = -1 as any;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;
        this._itemID = wrapper.readInt();
        this._corpID = wrapper.readInt();
        this._licenseType = wrapper.readInt();
        return true;
    }

    public get data(): LicenseComputerData {
        return {
            itemID: this._itemID,
            corpID: this._corpID,
            licenseType: this._licenseType,
        }
    }
}
