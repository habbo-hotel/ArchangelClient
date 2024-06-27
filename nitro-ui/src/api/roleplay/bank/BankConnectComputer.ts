import { BankConnectComputerComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../nitro';

export function BankConnectComputer(itemID: number, corpID: number): void {
    SendMessageComposer(new BankConnectComputerComposer(itemID, corpID));
}
