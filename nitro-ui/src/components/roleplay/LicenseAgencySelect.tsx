import { ChangeEvent, useEffect, useState } from "react";
import { LicenseAgencyData, LicenseAgencyListEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../hooks";
import { LicenseAgencyListQuery } from "../../api/roleplay/license/LicenseAgencyListQuery";

export interface LicenseAgencySelectProps {
    corpID?: number;
    onChange(newBank: LicenseAgencyData): void;
}

export function LicenseAgencySelect({ corpID, onChange }: LicenseAgencySelectProps) {
    const [licenseAgencies, setLicenseAgencies] = useState<Array<LicenseAgencyData>>([]);

    useEffect(() => {
        LicenseAgencyListQuery();
    }, []);

    useMessageEvent<LicenseAgencyListEvent>(LicenseAgencyListEvent, event => {
        setLicenseAgencies(event.getParser().agencies);
    });

    function onChangeAgency(event: ChangeEvent<HTMLSelectElement>) {
        const matchingAgency = licenseAgencies.find(_ => _.corpID === Number(event.currentTarget.value));
        if (!matchingAgency) {
            return;
        }
        onChange(matchingAgency);
    }

    return (
        <select style={{ width: '100%', padding: 14 }} value={corpID} onChange={onChangeAgency}>
            {
                !corpID && <option selected disabled>Select a license agency</option>
            }
            {
                licenseAgencies.map(agency => (
                    <option key={`agency_${agency.corpID}`} value={agency.corpID}>
                        {agency.corpName}
                    </option>
                ))
            }
        </select>
    )
}