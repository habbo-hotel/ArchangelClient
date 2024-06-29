import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { LicenseType } from "./LicenseStatusEventParser";

export interface LicenseAgencyData {
    corpID: number;
    corpName: string;
    licenseType: LicenseType;
}

export class LicenseAgencyListEventParser implements IMessageParser {
    private _agencies: Array<LicenseAgencyData> = [];

    public flush(): boolean {
        this._agencies = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalBanks = wrapper.readInt();

        for (let i = 0; i < totalBanks; i++) {
            const [corpID, corpName, licenseType] = wrapper.readString().split(';');
            this._agencies.push({
                corpName,
                corpID: Number(corpID),
                licenseType: LicenseType[licenseType],
            });
        }

        return true;
    }

    public get agencies(): Array<LicenseAgencyData> {
        return this._agencies;
    }

}
