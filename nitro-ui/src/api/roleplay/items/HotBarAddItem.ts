import { HotBarAddItemComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function HotBarAddItem(itemID: number): void {
    SendMessageComposer(new HotBarAddItemComposer(itemID));
}
