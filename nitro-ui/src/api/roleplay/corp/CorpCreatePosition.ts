import { CorpCreatePositionComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CorpCreatePosition(corpID: number, orderID: number, name: string, motto: string, salary: number, maleUniform: string, femaleUniform: string, canHire: boolean, canFire: boolean, canPromote: boolean, canDemote: boolean, canWorkAnywhere: boolean): void {
    SendMessageComposer(new CorpCreatePositionComposer(corpID, orderID, name, motto, salary, maleUniform, femaleUniform, canHire, canFire, canPromote, canDemote, canWorkAnywhere));
}
