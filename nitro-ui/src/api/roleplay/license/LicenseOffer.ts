import { LicenseOfferComposer, LicenseType } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function LicenseOffer(username: string, licenseType: LicenseType): void {
    SendMessageComposer(new LicenseOfferComposer(username, licenseType));
}
