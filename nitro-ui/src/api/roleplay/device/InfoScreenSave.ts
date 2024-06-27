import { InfoScreenSaveComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function InfoScreenSave(itemID: number, content: string): void {
    SendMessageComposer(new InfoScreenSaveComposer(itemID, content));
}
