import { CallPoliceComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function CallPolice(message: string): void {
    SendMessageComposer(new CallPoliceComposer(message));
}
