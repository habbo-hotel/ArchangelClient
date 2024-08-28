import { Text } from "../../../common";

export function WeaponWheel() {
    return (
        <div id="weapon-wheel" className="modal">
            <div className="wheel">
                <div className="wheel-item" id="item1">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 1" />
                </div>
                <div className="wheel-item" id="item2">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 2" />
                </div>
                <div className="wheel-item" id="item3">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 3" />
                </div>
                <div className="wheel-item" id="item4">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 4" />
                </div>
                <div className="wheel-item" id="item5">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 5" />
                </div>
                <div className="wheel-item" id="item6">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 6" />
                </div>
                <div className="wheel-item" id="item7">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 7" />
                </div>
                <div className="wheel-item" id="item8">
                    <img src="https://i.imgur.com/ln9rPLu.png" alt="Weapon 8" />
                </div>
            </div>
            <div className="center-info">
                <div className="weapon-name">
                    <Text bold fontSize={5} variant="white">
                        Combat Pistol
                    </Text>
                </div>
                <div className="weapon-details">
                    <Text bold fontSize={6} variant="white">
                        24 / 30
                    </Text>
                </div>
            </div>
        </div>
    )
}