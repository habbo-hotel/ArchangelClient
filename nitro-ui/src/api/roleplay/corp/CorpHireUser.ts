import { CorpHireUserComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CorpHireUser(username: string): void {
    SendMessageComposer(new CorpHireUserComposer(username));
}
