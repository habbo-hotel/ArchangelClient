import { Text } from "../../../common";

export function EquippedWeapon() {
    return (
        <div className="nitro-equipped-weapon glass-panel">
            <div className="weapon-hud">
                <div className="weapon-info">
                    <img src="https://i.imgur.com/ztmIqUl.png" alt="M4" className="weapon-icon" />
                    <div className="attachments">
                        <div className="attachment purple"></div>
                    </div>
                    <div className="weapon-name">M4A1</div>
                </div>
                <div className="ammo-info">
                    <div className="current-ammo">30</div>
                    <div className="ammo-icon">
                        <div className="ammo-img"></div>
                    </div>
                    <div className="reserve-ammo">250</div>
                </div>
            </div>
        </div>
    )
}