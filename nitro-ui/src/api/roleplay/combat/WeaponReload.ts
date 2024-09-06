import { WeaponReloadComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function WeaponReload(): void {
    SendMessageComposer(new WeaponReloadComposer());
}
