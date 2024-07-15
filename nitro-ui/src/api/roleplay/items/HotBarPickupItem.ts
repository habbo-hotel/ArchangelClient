import { HotBarPickupItemComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function HotBarPickupItem(itemID: number): void {
    SendMessageComposer(new HotBarPickupItemComposer(itemID));
}
