import { FaApple, FaBolt, FaFish, FaHamburger, FaHeart, FaRunning, FaShieldAlt } from "react-icons/fa";
import { Flex } from "../../../common";

const getColor = (value) => {
    if (value >= 80) return "#4caf50"; // Green for high values
    if (value >= 60) return "#ffc107"; // Yellow for medium-high values
    if (value >= 40) return "#ff9800"; // Orange for medium-low values
    return "#f44336"; // Red for low values
};

export function PlayerStats() {
    const stats = [
        { icon: FaHeart, value: 100 },
        { icon: FaShieldAlt, value: 0 },
        { icon: FaRunning, value: 20 },
        { icon: FaHamburger, value: 100 }
    ];

    return (
        <div className="nitro-player-stats">
            <Flex center fullWidth>
                <div className="player-stats">
                    <div className="circular-stats">
                        {stats.map((stat, index) => (
                            <div className="stat-circle" key={index}>
                                <stat.icon className="stat-icon" style={{ color: getColor(stat.value) }} />
                                <svg viewBox="0 0 36 36" className="circular-chart">
                                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path
                                        className="circle"
                                        strokeDasharray={`${stat.value}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        style={{ stroke: getColor(stat.value) }}
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </Flex>
        </div>
    )
}