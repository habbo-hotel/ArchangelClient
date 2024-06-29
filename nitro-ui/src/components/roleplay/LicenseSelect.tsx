import { ChangeEvent } from "react";
import { LicenseType } from "@nitro-rp/renderer";

export interface LicenseSelectProps {
    licenseType: LicenseType;
    onChange(newLicenseType: LicenseType): void;
}

const LICENSE_TYPE_OPTIONS: Array<{ label: string; value: LicenseType; }> = Object.keys(LicenseType).map(_ => ({
    label: _.toLowerCase(),
    value: LicenseType[_]
}))

export function LicenseSelect({ licenseType, onChange }: LicenseSelectProps) {
    function onChangeLicense(event: ChangeEvent<HTMLSelectElement>) {
        onChange(event.currentTarget.value as any);
    }

    return (
        <select style={{ width: '100%', padding: 14 }} value={licenseType} onChange={onChangeLicense}>
            {
                !licenseType && <option selected disabled>Select a license type</option>
            }
            {
                LICENSE_TYPE_OPTIONS.map(license => (
                    <option key={`license_${license.value}`} value={license.value}>
                        {license.label}
                    </option>
                ))
            }
        </select>
    )
}