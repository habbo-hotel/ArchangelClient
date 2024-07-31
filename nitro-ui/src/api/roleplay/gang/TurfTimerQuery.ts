import { TurfTimerQueryComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function TurfTimerQuery(): void {
    SendMessageComposer(new TurfTimerQueryComposer());
}
