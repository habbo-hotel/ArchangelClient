import { useMyWeaponList } from '../../../../hooks/roleplay/use-my-weapon-list';

export function WeaponsListView() {
    const weaponList = useMyWeaponList();
    return (
        <>
            {
                weaponList.map(_ => (
                    <div key={`_weapon_${_.uniqueName}`}>
                        <b>{_.displayName}</b>
                    </div>
                ))
            }
        </>
    )

}