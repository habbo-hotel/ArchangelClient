import { BankAccountDepositComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function BankAccountDeposit(corpID: number, depositAmount: number): void {
    SendMessageComposer(new BankAccountDepositComposer(corpID, depositAmount));
}
