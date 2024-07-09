import { RoleplayPermissionsComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function RoleplayPermissionsQuery(): void {
    SendMessageComposer(new RoleplayPermissionsComposer());
}
