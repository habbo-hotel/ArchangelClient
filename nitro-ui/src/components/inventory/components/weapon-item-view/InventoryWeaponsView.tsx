import { useMyWeaponList } from '../../../../hooks/roleplay/use-my-weapon-list';
import { AutoGrid, Column, Grid, LayoutGridItem } from '../../../../common';
import { EquipWeapon } from '../../../../api/roleplay/combat/EquipWeapon';
import { useCallback, useState } from 'react';
import { InventoryCategoryEmptyView } from '../InventoryCategoryEmptyView';
import { LocalizeText } from '../../../../api';

export function InventoryWeaponsView() {
    const weaponList = useMyWeaponList();
    const [equippedWeapon, setEquippedWeapon] = useState<string>();

    const onEquip = useCallback((uniqueName: string) => {
        EquipWeapon(uniqueName);
        setEquippedWeapon(uniqueName);
    }, []);

    if (!weaponList.length) return <InventoryCategoryEmptyView title={LocalizeText('inventory.empty.weapons.title')} desc={LocalizeText('inventory.empty.weapons.desc')} />;
    return (
        <Grid>
            <Column size={5} overflow="hidden">
                <AutoGrid columnCount={4}>
                    {
                        weaponList.map(_ => (
                            <LayoutGridItem key={`weapon_${_.uniqueName}`} overflow="unset" itemActive={(equippedWeapon === _.uniqueName)} onClick={() => onEquip(_.uniqueName)} className="p-1">
                                {_.displayName}
                            </LayoutGridItem>
                        ))
                    }
                </AutoGrid>
            </Column>
            <Column size={5} overflow="auto">
                <Column overflow="hidden" position="relative">
                    {equippedWeapon}
                </Column>
            </Column>
        </Grid>
    )

}
