import { LayoutAvatarImageView } from "../../../common";
import { useSessionInfo } from "../../../hooks";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

export function PlayerHealth() {
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId);

    if (!userInfo?.userId) {
        return null;
    }

    return (
        <div className="nitro-player-health">
            <PlayerStats name={userInfo.username} avatar={userInfo.figure} health={rpStats.healthNow} energy={rpStats.energyNow} />
        </div>
    )
}

function PlayerStats({ name, avatar, health, energy }) {
    return (
        <div className="character-card">
            <div className="character-image">
                <LayoutAvatarImageView className="avatar" figure={avatar} direction={2} />
            </div>
            <div className="character-info">
                <div className="health-value">{energy}</div>
                <div className="health-bar">
                    <div className="health-bar-fill"></div>
                </div>
                <div className="character-name">{name}</div>
            </div>
        </div>
    );
};

function StatBar({ type, value, max }) {
    const percentage = (value / max) * 100;
    return (
        <div className={`stat-bar ${type}`}>
            <div className="value">{value}</div>
            <div className="bar">
                <div className="fill" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};