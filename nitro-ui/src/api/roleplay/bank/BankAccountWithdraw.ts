import { BankAccountWithdrawComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function BankAccountWithdraw(corpID: number, withdrawAmount: number): void {
    SendMessageComposer(new BankAccountWithdrawComposer(corpID, withdrawAmount));
}
