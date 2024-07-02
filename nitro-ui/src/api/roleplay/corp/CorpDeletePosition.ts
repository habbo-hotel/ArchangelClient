import { CorpDeletePositionComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CorpDeletePosition(corpID: number, corpPositionID: number): void {
    SendMessageComposer(new CorpDeletePositionComposer(corpID, corpPositionID));
}
