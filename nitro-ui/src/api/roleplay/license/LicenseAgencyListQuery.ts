import { LicenseAgencyListComposer, LicenseType } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function LicenseAgencyListQuery(): void {
    SendMessageComposer(new LicenseAgencyListComposer());
}
