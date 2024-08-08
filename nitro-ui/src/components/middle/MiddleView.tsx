import { FaMapPin } from 'react-icons/fa';
import { TurfTimer } from './turf-timer/TurfTimer';
import { useNavigator, useSessionInfo } from '../../hooks';

export function MiddleView() {
    const { navigatorData = null } = useNavigator();
    const { userInfo } = useSessionInfo();
    return (
        <>
            <div className="nitro-middle">
                <TurfTimer />
            </div>
            <div className="top-bar glass-panel neon-border">
                <div className="location-info">
                    <i className="fas fa-galaxy"></i> {navigatorData?.enteredGuestRoom?.roomName}
                </div>
                <div className="player-info">
                    <div className="avatar"></div>
                    <span className="level-badge">LVL 1</span>
                    <span>{userInfo?.username}</span>
                </div>
            </div>
        </>
    )
}