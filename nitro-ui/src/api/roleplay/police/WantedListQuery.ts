import { WantedListQueryComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function WantedListQuery(): void {
    SendMessageComposer(new WantedListQueryComposer());
}
