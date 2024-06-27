import { InfoScreenSaveComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function InfoScreenSave(): void {
    SendMessageComposer(new InfoScreenSaveComposer());
}
