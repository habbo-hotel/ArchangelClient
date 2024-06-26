import { BankConnectATMComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function BankConnectATM(itemID: number, corpID: number): void {
    SendMessageComposer(new BankConnectATMComposer(itemID, corpID));
}
