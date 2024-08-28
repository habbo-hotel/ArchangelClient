import { Text } from "../../../common";
import { useCallback, useEffect, useState } from "react";
import { ILinkEventTracker, MyWeaponData, NitroConfiguration } from "@nitro-rp/renderer";
import { EquipWeapon } from "../../../api/roleplay/combat/EquipWeapon";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { useMyWeaponList } from "../../../hooks/roleplay/use-my-weapon-list";

export function WeaponWheel() {
    const weapons = useMyWeaponList();
    const [visible, setVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<MyWeaponData>();


    const onEquip = useCallback((uniqueName: string) => {
        EquipWeapon(uniqueName);
        setVisible(false);
    }, []);

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) {
                    case 'show':
                        setVisible(true);
                        return;
                    case 'hide':
                        setVisible(false);
                        return;
                    case 'toggle':
                        setVisible(_ => !_);
                        return;
                }
            },
            eventUrlPrefix: 'weapon-wheel/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div id="weapon-wheel" className="modal" onClick={() => setVisible(false)}>
            <div className="wheel" onClick={e => e.stopPropagation()}>
                {
                    (weapons.slice(0, 8)).map((weapon, i) => (
                        <div className="wheel-item" key={`weapon_${weapon.uniqueName}`} id={`item${i + 1}`} onMouseEnter={() => setHoveredItem(weapon)} onClick={() => onEquip(weapon.uniqueName)}>
                            <img src={`${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${weapon.uniqueName}.png`} alt={weapon.uniqueName} className="weapon-icon" />
                        </div>
                    ))
                }
            </div>
            <div className="center-info">
                <div className="weapon-name">
                    <Text bold fontSize={5} variant="white">
                        {hoveredItem ? hoveredItem.displayName : ''}
                        {!weapons.length ? "You don't own any weapons" : ''}
                    </Text>
                </div>
            </div>
        </div >
    )
}