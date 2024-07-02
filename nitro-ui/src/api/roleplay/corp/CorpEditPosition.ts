import { CorpEditPositionComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CorpEditPosition(corpID: number, corpPositionID: number, name: string, motto: string, salary: number, maleUniform: string, femaleUniform: string, canHire: boolean, canFire: boolean, canPromote: boolean, canDemote: boolean, canWorkAnywhere: boolean): void {
    SendMessageComposer(new CorpEditPositionComposer(corpID, corpPositionID, name, motto, salary, maleUniform, femaleUniform, canHire, canFire, canPromote, canDemote, canWorkAnywhere));
}
