import { DeviceOpenComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function DeviceOpen(itemID: number): void {
    console.log(itemID)
    SendMessageComposer(new DeviceOpenComposer(itemID));
}
