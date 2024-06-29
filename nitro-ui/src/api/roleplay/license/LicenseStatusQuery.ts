import { LicenseStatusQueryComposer, LicenseType } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function LicenseStatusQuery(licenseType: LicenseType, userID: number): void {
    SendMessageComposer(new LicenseStatusQueryComposer(licenseType, userID));
}
