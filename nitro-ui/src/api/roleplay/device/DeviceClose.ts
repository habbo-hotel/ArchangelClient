import { DeviceCloseComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function DeviceClose(itemID: number): void {
    SendMessageComposer(new DeviceCloseComposer(itemID));
}
