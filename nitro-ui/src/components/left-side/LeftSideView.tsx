import { MyRoleplayStats } from '../roleplay-stats/MyRoleplayStats';
import { TargetRoleplayStats } from '../roleplay-stats/TargetRoleplayStats';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <TargetRoleplayStats />
            <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <MyRoleplayStats />
            </div>
        </div>
    );
}
