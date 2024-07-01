import { CorpEmployeeListComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function CorpEmployeeList(corpID: number): void {
    SendMessageComposer(new CorpEmployeeListComposer(corpID));
}
