import { FaBox, FaCamera, FaCog, FaMicrophone, FaShieldAlt, FaTaxi } from "react-icons/fa";
import { CreateLinkEvent, GetSessionDataManager } from "../../../api";

export function GameTools() {
    function isMod(): boolean {
        return GetSessionDataManager().isModerator
    }

    return (

        <div style={{ position: 'relative' }}>
            <div className="quick-menu">
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('navigator/toggle')} >
                    <FaTaxi size={20} />
                </div>
                <div className="menu-button glass-panel" onClick={() => CreateLinkEvent('inventory/toggle')}>
                    <FaBox size={20} />
                </div>
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('camera/toggle')} >
                    <FaCamera size={20} />
                </div>
                {
                    isMod() && (
                        <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('mod-tools/toggle')} >
                            <FaShieldAlt size={20} />
                        </div>
                    )
                }
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('game-settings/toggle')} >
                    <FaCog size={20} />
                </div>
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('speech-wheel/toggle')} >
                    <FaMicrophone size={20} />
                </div>
            </div>
        </div>
    )
}