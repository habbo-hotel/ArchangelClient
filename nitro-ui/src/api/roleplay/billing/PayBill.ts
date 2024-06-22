import { PayBillComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function PayBill(billID: string): void {
    SendMessageComposer(new PayBillComposer(billID));
}
