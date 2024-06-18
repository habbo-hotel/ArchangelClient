import { useMemo, useState } from 'react';
import { NitroCardContentView, NitroCardTabsItemView, NitroCardTabsView } from '../../../common';
import { Tab } from '../Inventory.types';

export function CorpInventory() {
    const inventoryTabs: Tab[] = useMemo(() => [
        {
            label: 'Merchandise',
            children: <p>Merchandise</p>
        },
        {
            label: 'Furniture',
            children: <p>Furniture</p>
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
