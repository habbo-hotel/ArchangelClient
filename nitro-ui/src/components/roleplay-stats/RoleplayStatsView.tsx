import { useState } from "react";
import { MyRoleplayStats } from "./MyRoleplayStats";
import { TargetRoleplayStats } from "./TargetRoleplayStats";

export function RoleplayStatsView() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TargetRoleplayStats />
        </div>
    )
}