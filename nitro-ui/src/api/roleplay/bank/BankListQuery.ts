import { BankListComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function BankListQuery(): void {
    SendMessageComposer(new BankListComposer());
}
