import { WantedListAddUserComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function WantedListAddUser(username: string, crime: string): void {
    SendMessageComposer(new WantedListAddUserComposer(username, crime));
}
