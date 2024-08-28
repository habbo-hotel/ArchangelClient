import { RoleplayStatsContainerProps } from "./RoleplayStatsContainer.types";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { useMemo } from "react";
import { Flex, LayoutAvatarImageView, Text } from "../../../../common";

export function RoleplayStatsContainer({ userID, onToggle }: RoleplayStatsContainerProps) {
    const roleplayStats = useRoleplayStats(userID);

    const [healthPercent, energyPercent] = useMemo(() => {
        const healthPercent = (roleplayStats.healthNow / roleplayStats.healthMax) * 100;
        const energyPercent = (roleplayStats.energyNow / roleplayStats.energyMax) * 100;
        return [healthPercent, energyPercent];
    }, [roleplayStats.healthMax, roleplayStats.healthNow, roleplayStats.energyMax, roleplayStats.energyNow]);

    return (
        <div className="stats glass-panel">
            <Flex alignItems="center" fullWidth>
                <LayoutAvatarImageView figure={roleplayStats.figure} direction={2} style={{ height: 55, marginLeft: -10 }} />
                <Flex column fullWidth gap={2}>
                    <Flex fullWidth justifyContent="between" alignItems="center">
                        <b>LVL 1</b>
                        <Text bold fontSize={5} variant="white">{roleplayStats.username}</Text>
                    </Flex>
                    <div>
                        <div className="stat-bar" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                            <div className="stat-fill health-fill" style={{ width: `${healthPercent}%` }} />
                        </div>
                    </div>
                    <div style={{ marginTop: -24 }}>
                        <div className="stat-bar" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                            <div className="stat-fill energy-fill" style={{ width: `${energyPercent}%` }} />
                        </div>
                    </div>
                </Flex>
            </Flex>

        </div>
    )
}