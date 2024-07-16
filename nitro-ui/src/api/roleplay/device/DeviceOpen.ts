import { DeviceOpenComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function DeviceOpen(itemID: number): void {
    SendMessageComposer(new DeviceOpenComposer(itemID));
}
