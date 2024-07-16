import { WantedListRemoveUserComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function WantedListRemoveUser(username: string, crime: string): void {
    SendMessageComposer(new WantedListRemoveUserComposer(username, crime));
}
