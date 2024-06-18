import { useMemo, useState } from 'react';
import { NitroCardContentView, NitroCardTabsItemView, NitroCardTabsView } from '../../../common';
import { Tab } from '../Inventory.types';

export function GangInventory() {
    const inventoryTabs: Tab[] = useMemo(() => [
        {
            label: 'Weapons',
            children: <p>Weapons</p>
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
                        <NitroCardTabsItemView key={index} isActive={(currentTab === tab)} onClick={event => setCurrentTab(tab)}>
                            {tab.label}
                        </NitroCardTabsItemView>
                    );
                })}
            </NitroCardTabsView>
            <NitroCardContentView>
                {currentTab.children}
            </NitroCardContentView>
        </>
    )
}
