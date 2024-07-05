import { CorpSuperhireComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function CorpSuperHire(username: string, corpID: number, corpPositionID: number): void {
    SendMessageComposer(new CorpSuperhireComposer(username, corpID, corpPositionID));
}
