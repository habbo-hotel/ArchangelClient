import { RoleplayStatsContainerProps } from "./RoleplayStatsContainer.types";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { useMemo } from "react";

export function RoleplayStatsContainer({ userID, onToggle }: RoleplayStatsContainerProps) {
    const roleplayStats = useRoleplayStats(userID);

    const [healthPercent, energyPercent] = useMemo(() => {
        const healthPercent = (roleplayStats.healthNow / roleplayStats.healthMax) * 100;
        const energyPercent = (roleplayStats.energyNow / roleplayStats.energyMax) * 100;
        return [healthPercent, energyPercent];
    }, [roleplayStats.healthMax, roleplayStats.healthNow, roleplayStats.energyMax, roleplayStats.energyNow]);

    return (
        <div className="stats glass-panel neon-border">
            Health
            <div className="stat-bar">
                <div className="stat-fill health-fill" style={{ width: `${healthPercent}%` }} />
            </div>
            Energy
            <div className="stat-bar">
                <div className="stat-fill energy-fill" style={{ width: `${energyPercent}%` }} />
            </div>
        </div>
    )
}