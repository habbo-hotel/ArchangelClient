import { BankAccountOpenComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function BankAccountOpen(username: string): void {
    SendMessageComposer(new BankAccountOpenComposer(username));
}
