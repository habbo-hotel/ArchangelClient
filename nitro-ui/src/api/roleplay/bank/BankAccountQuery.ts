import { BankAccountQueryComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function BankAccountQuery(corpID: number, username: string): void {
    SendMessageComposer(new BankAccountQueryComposer(corpID, username));
}
