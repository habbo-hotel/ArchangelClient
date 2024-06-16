import { CombatDelayComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function CombatDelay(): void {
    SendMessageComposer(new CombatDelayComposer());
}
