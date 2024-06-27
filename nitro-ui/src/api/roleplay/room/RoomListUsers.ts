import { RoomListUsersComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function RoomListUsers(): void {
    SendMessageComposer(new RoomListUsersComposer());
}
