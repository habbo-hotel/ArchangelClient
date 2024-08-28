import { useState } from 'react';
import { NitroCardContentView, NitroCardTabsItemView, NitroCardTabsView } from '../../../common';
import { Tab } from '../Inventory.types';
import { InventoryFurnitureView } from '../components/furniture/InventoryFurnitureView';
import { IRoomSession, RoomPreviewer } from '@nitro-rp/renderer';
import { InventoryBotView } from '../components/bot-item-view/InventoryBotView';
import { InventoryBadgeView } from '../components/badge-item-view/InventoryBadgeView';

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
            label: 'Bots',
            children: <InventoryBotView roomSession={roomSession} roomPreviewer={roomPreviewer} />
        },
        {
            label: 'Badges',
            children: <InventoryBadgeView />
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
