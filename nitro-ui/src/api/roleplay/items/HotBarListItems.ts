import { HotBarListItemsComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function HotBarListItems(): void {
    SendMessageComposer(new HotBarListItemsComposer());
}
