import { UserOnlineCountComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function userOnlineCountQuery(): void {
    SendMessageComposer(new UserOnlineCountComposer());
}
