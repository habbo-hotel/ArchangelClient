import { CorpListComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function CorpList(): void {
    SendMessageComposer(new CorpListComposer());
}
