import { useMemo } from "react";
import { CreateLinkEvent } from "../../../api";
import { Text } from "../../../common";
import { useSessionInfo } from "../../../hooks";
import { useMyWeaponList } from "../../../hooks/roleplay/use-my-weapon-list";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { NitroConfiguration } from "@nitro-rp/renderer";

export function EquippedWeapon() {
    const session = useSessionInfo();
    const weapons = useMyWeaponList();
    const roleplayStats = useRoleplayStats(session?.userInfo?.userId);

    const equippedWeapon = useMemo(() => weapons.find(_ => _.itemID === roleplayStats.equippedWeaponID), [roleplayStats.equippedWeaponID]);

    return (
        <div className="nitro-equipped-weapon glass-panel">
            <div className="weapon-hud" onClick={() => CreateLinkEvent('weapon-wheel/toggle')} >
                <div className="weapon-info">
                    {equippedWeapon && (
                        <>
                            <img src={`${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${equippedWeapon.uniqueName}.png`} alt={equippedWeapon.uniqueName} className="weapon-icon" style={{ width: 200 }} />
                            <div className="weapon-name">
                                <Text bold center variant="white" fontSize={4} style={{ paddingTop: 20 }}>
                                    {equippedWeapon.displayName}
                                </Text>
                            </div>
                        </>
                    )}
                    {
                        !equippedWeapon && (
                            <>
                                <div className="weapon-icon" style={{ width: 129 }} onClick={() => CreateLinkEvent('weapon-wheel/toggle')} />
                            </>
                        )
                    }
                </div>
                {
                    equippedWeapon?.magazineSize ? (
                        <div className="ammo-info">
                            <div className="current-ammo">{roleplayStats.equippedWeaponAmmoLeft}</div>
                            <div className="reserve-ammo">/&nbsp;{equippedWeapon.magazineSize}</div>
                        </div>
                    )
                        : ''
                }
            </div>
        </div>
    )
}