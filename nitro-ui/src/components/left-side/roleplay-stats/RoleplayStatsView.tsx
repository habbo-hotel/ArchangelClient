import { MyRoleplayStats } from "./MyRoleplayStats";
import { TargetRoleplayStats } from "./TargetRoleplayStats";

export function RoleplayStatsView() {
    return (
        <div style={{ display: 'flex', gap: 120, width: 800 }}>
            <TargetRoleplayStats />
            <MyRoleplayStats />
        </div>
    )
}