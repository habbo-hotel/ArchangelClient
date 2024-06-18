import { useMemo, useState } from 'react';
import { NitroCardContentView, NitroCardTabsItemView, NitroCardTabsView } from '../../../common';
import { Tab } from '../Inventory.types';
import { InventoryFurnitureView } from '../components/furniture-item-view/InventoryFurnitureView';


export function UserInventory() {
    const inventoryTabs: Tab[] = useMemo(() => [
        {
            label: 'Furniture',
            children: <InventoryFurnitureView />
        },
        {
            label: 'Weapons',
            children: <p>Weapons</p>
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
