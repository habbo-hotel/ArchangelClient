import { useMemo, useState } from 'react';
import { NitroCardContentView, NitroCardTabsItemView, NitroCardTabsView } from '../../../common';
import { Tab } from '../Inventory.types';
import { InventoryFurnitureView } from '../components/furniture/InventoryFurnitureView';
import { InventoryWeaponsView } from '../components/weapon-item-view/InventoryWeaponsView';
import { IRoomSession, RoomPreviewer } from '@nitro-rp/renderer';
import { InventoryBotView } from '../components/bot-item-view/InventoryBotView';

interface UserInventoryProps {
    roomSession: IRoomSession;
    roomPreviewer: RoomPreviewer;
}

export function UserInventory({ roomSession, roomPreviewer }: UserInventoryProps) {
    const inventoryTabs: Tab[] = [
        {
            label: 'Furniture',
            children: <InventoryFurnitureView roomSession={roomSession} roomPreviewer={roomPreviewer} />
        },
        {
            label: 'Weapons',
            children: <InventoryWeaponsView />
        },
        {
            label: 'Bots',
            children: <InventoryBotView roomSession={roomSession} roomPreviewer={roomPreviewer} />
        },
    ]
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
