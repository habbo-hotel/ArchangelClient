import { LicenseConnectComputerComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function LicenseConnectComputer(itemID: number, corpID: number): void {
    SendMessageComposer(new LicenseConnectComputerComposer(itemID, corpID));
}
