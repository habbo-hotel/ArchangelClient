import { useMemo, useState } from 'react';
import { NitroCardContentView, NitroCardTabsItemView, NitroCardTabsView } from '../../../common';
import { Tab } from '../Inventory.types';
import { InventoryFurnitureView } from '../components/furniture/InventoryFurnitureView';
import { InventoryWeaponsView } from '../components/weapon-item-view/InventoryWeaponsView';
import { IRoomSession, RoomPreviewer } from '@nitro-rp/renderer';

interface UserInventoryProps {
    roomSession: IRoomSession;
    roomPreviewer: RoomPreviewer;
}

export function UserInventory({ roomSession, roomPreviewer }: UserInventoryProps) {
    const inventoryTabs: Tab[] = useMemo(() => [
        {
            label: 'Furniture',
            children: <InventoryFurnitureView roomSession={roomSession} roomPreviewer={roomPreviewer} />
        },
        {
            label: 'Weapons',
            children: <InventoryWeaponsView />
        },
        {
            label: 'Apparel',
            children: <p>Apparel</p>
        },
        {
            label: 'Aid',
            children: <p>Aid</p>
        },
        {
            label: 'Ammo',
            children: <p>Ammo</p>
        },
    ], []);
    const [currentTab, setCurrentTab] = useState<Tab>(inventoryTabs[0]);

    return (
        <>
            <NitroCardTabsView>
                {inventoryTabs.map((tab, index) => {
                    return (
                        <NitroCardTabsItemView key={index} isActive={(currentTab === tab)} onClick={() => setCurrentTab(tab)}>
                            {tab.label}
                        </NitroCardTabsItemView>
                    );
                })}
            </NitroCardTabsView>
            <NitroCardContentView>
                {currentTab.children}
            </NitroCardContentView>
        </>
    );
}
