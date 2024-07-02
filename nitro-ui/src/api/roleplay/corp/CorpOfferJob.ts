import { CorpOfferUserJobComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CorpOfferJob(username: string): void {
    SendMessageComposer(new CorpOfferUserJobComposer(username));
}
