import { CreateLinkEvent } from "../../../api";
import { Text } from "../../../common";

export function EquippedWeapon() {
    return (
        <div className="nitro-equipped-weapon glass-panel">
            <div className="weapon-hud" onClick={() => CreateLinkEvent('weapon-wheel/toggle')} >
                <div className="weapon-info">
                    <img src="https://i.imgur.com/LrPw0Zx.png" alt="M4" className="weapon-icon" />
                    <div className="weapon-name">
                        <Text bold center variant="white" fontSize={4} style={{ paddingTop: 20 }}>
                            M4A1
                        </Text>
                    </div>

                </div>
                <div className="ammo-info">
                    <div className="current-ammo">30</div>
                    <div className="reserve-ammo">/&nbsp;250</div>
                </div>
            </div>
        </div>
    )
}