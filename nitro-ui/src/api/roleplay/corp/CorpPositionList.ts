import { CorpPositionListComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function CorpPositionList(corpID: number): void {
    SendMessageComposer(new CorpPositionListComposer(corpID));
}
