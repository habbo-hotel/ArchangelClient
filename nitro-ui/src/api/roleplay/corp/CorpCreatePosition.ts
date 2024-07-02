import { CorpCreatePositionComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CorpCreatePosition(corpID: number, name: string, motto: string, salary: number, orderID: number, maleUniform: string, femaleUniform: string, canHire: boolean, canFire: boolean, canPromote: boolean, canDemote: boolean, canWorkAnywhere: boolean): void {
    SendMessageComposer(new CorpCreatePositionComposer(corpID, name, motto, salary, orderID, maleUniform, femaleUniform, canHire, canFire, canPromote, canDemote, canWorkAnywhere));
}
