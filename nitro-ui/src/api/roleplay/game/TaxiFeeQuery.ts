import { TaxiFeeQueryComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function taxiFeeQuery(): void {
    SendMessageComposer(new TaxiFeeQueryComposer());
}
