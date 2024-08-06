import { MyRoleplayStats } from '../roleplay-stats/MyRoleplayStats';
import { TargetRoleplayStats } from '../roleplay-stats/TargetRoleplayStats';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <TargetRoleplayStats />
        </div>
    );
}
