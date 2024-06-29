import { useEffect, useState } from "react";
import { LicenseStatusData, LicenseStatusEvent, LicenseType } from "@nitro-rp/renderer";
import { useMessageEvent } from "../events";
import { LicenseStatusQuery } from "../../api/roleplay/license/LicenseStatusQuery";

export function useLicenseStatus(licenseType: LicenseType, userID: number): LicenseStatusData {
    const [licenseStatus, setLicenseStatus] = useState<LicenseStatusData>({
        licenseType,
        licenseIsValid: false,
    })

    useEffect(() => {
        setLicenseStatus({
            licenseType,
            licenseIsValid: false,
        })
        LicenseStatusQuery(licenseType, userID)
    }, [licenseType, userID]);

    useMessageEvent<LicenseStatusEvent>(LicenseStatusEvent, event => {
        const eventData: LicenseStatusData = event.getParser().data;
        if (eventData.userID !== userID) {
            return;
        }
        setLicenseStatus(eventData);
    });

    return licenseStatus;
}