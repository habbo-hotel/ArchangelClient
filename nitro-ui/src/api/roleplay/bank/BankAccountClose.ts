import { BankAccountCloseComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function BankAccountClose(username: string): void {
    SendMessageComposer(new BankAccountCloseComposer(username));
}
