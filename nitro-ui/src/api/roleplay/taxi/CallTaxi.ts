import { SendMessageComposer } from '../..';
import { CallTaxiComposer } from '@nitro-rp/renderer';

export function CallTaxi(roomID: number): void {
    SendMessageComposer(new CallTaxiComposer(roomID));
}
