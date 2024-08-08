import { FaBox, FaCamera, FaCog, FaShieldAlt, FaStore, FaTaxi, FaUsers } from "react-icons/fa";
import { CreateLinkEvent, GetSessionDataManager } from "../../../api";

export function GameTools() {
    const isMod = GetSessionDataManager().isModerator;
    return (

        <div style={{ position: 'relative' }}>
            <div className="quick-menu">
                <div className="menu-button glass-panel neon-border" onClick={() => CreateLinkEvent('navigator/toggle')} >
                    <FaTaxi size={20} />
                </div>
                <div className="menu-button glass-panel neon-border" onClick={() => CreateLinkEvent('catalog/toggle')} >
                    <FaStore size={20} />
                </div>
                <div className="menu-button glass-panel neon-border" onClick={() => CreateLinkEvent('inventory/toggle')}>
                    <FaBox size={20} />
                </div>
                <div className="menu-button glass-panel neon-border" onClick={() => CreateLinkEvent('camera/toggle')} >
                    <FaCamera size={20} />
                </div>
                {
                    isMod && (
                        <div className="menu-button glass-panel neon-border" onClick={() => CreateLinkEvent('mod-tools/toggle')} >
                            <FaShieldAlt size={20} />
                        </div>
                    )
                }
                <div className="menu-button glass-panel neon-border" onClick={() => CreateLinkEvent('navigator/toggle-room-info')} >
                    <FaCog size={20} />
                </div>
            </div>
        </div>
    )
}