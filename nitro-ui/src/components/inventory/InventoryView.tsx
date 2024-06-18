import { ILinkEventTracker } from '@nitro-rp/renderer';
import { FC, useEffect, useMemo, useState } from 'react';
import { AddEventLinkTracker, LocalizeText, RemoveLinkEventTracker } from '../../api';
import { AutoGrid, Column, Grid, LayoutAvatarImageView, LayoutGridItem, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../common';
import { useInventoryTrade, useSessionInfo } from '../../hooks';
import { UserInventory } from './views/UserInventory';
import { Tab } from './Inventory.types';
import { CorpInventory } from './views/CorpInventory';
import { GangInventory } from './views/GangInventory';
import { useRoleplayStats } from '../../hooks/roleplay/use-rp-stats';
import { GangBadge } from '../roleplay-stats/gang-badge/GangBadge';
import { CorpBadge } from '../roleplay-stats/corp-badge/CorpBadge';


export const InventoryView: FC<{}> = () => {
    const { userInfo } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const [isVisible, setIsVisible] = useState(false);
    const { isTrading = false, stopTrading = null } = useInventoryTrade();
    const inventoryTabs: Tab[] = useMemo(() => {
        const allTabs: Tab[] = [
            {
                label: (
                    <LayoutAvatarImageView figure={roleplayStats.figure} direction={4} />
                ),
                children: <UserInventory />
            },
        ]

        if (roleplayStats.corporationID) {
            allTabs.push(
                {
                    label: <CorpBadge corpID={roleplayStats.corporationID} />,
                    children: <CorpInventory />
                });
        }

        if (roleplayStats.gangID) {
            allTabs.push(
                {
                    label: <GangBadge gangID={roleplayStats.gangID} />,
                    children: <GangInventory />
                });
        }

        return allTabs;
    }, [roleplayStats]);
    const [currentTab, setCurrentTab] = useState<Tab>(inventoryTabs[0]);

    const onClose = () => {
        if (isTrading) stopTrading();

        setIsVisible(false);
    }

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'inventory/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    useEffect(() => {
        if (!isVisible && isTrading) setIsVisible(true);
    }, [isVisible, isTrading]);

    if (!isVisible) return null;

    return (
        <NitroCardView uniqueKey={'inventory'} className="nitro-inventory" theme={isTrading ? 'primary-slim' : ''} >

            <NitroCardHeaderView headerText={LocalizeText('inventory.title')} onCloseClick={onClose} />

            <NitroCardContentView>
                <Grid gap={2}>
                    <Column alignItems="center" size={2} overflow="auto">
                        <AutoGrid overflow={null} columnCount={1} columnMinHeight={50} className="user-groups-container">
                            {inventoryTabs.map((tab, index) => {
                                return (
                                    <LayoutGridItem key={index} overflow="unset" itemActive={(currentTab === tab)} onClick={() => setCurrentTab(tab)} className="p-1">
                                        {tab.label}
                                    </LayoutGridItem>
                                );
                            })}
                        </AutoGrid>
                    </Column>
                    <Column size={10} overflow="hidden">
                        {currentTab.children}
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView >
    );
}
