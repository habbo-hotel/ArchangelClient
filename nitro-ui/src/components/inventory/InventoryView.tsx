import { BadgePointLimitsEvent, ILinkEventTracker, IRoomSession, RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomPreviewer, RoomSessionEvent } from '@nitro-rp/renderer';
import { FC, useEffect, useMemo, useState } from 'react';
import { AddEventLinkTracker, GetLocalization, GetRoomEngine, LocalizeText, RemoveLinkEventTracker, isObjectMoverRequested, setObjectMoverRequested } from '../../api';
import { AutoGrid, Column, Grid, LayoutAvatarImageView, LayoutGridItem, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../common';
import { useInventoryTrade, useMessageEvent, useRoomEngineEvent, useRoomSessionManagerEvent, useSessionInfo } from '../../hooks';
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
    const [roomSession, setRoomSession] = useState<IRoomSession>(null);
    const [roomPreviewer, setRoomPreviewer] = useState<RoomPreviewer>(null);
    const inventoryTabs: Tab[] = useMemo(() => {
        const allTabs: Tab[] = [
            {
                label: (
                    <LayoutAvatarImageView figure={roleplayStats.figure} direction={4} />
                ),
                children: <UserInventory roomSession={roomSession} roomPreviewer={roomPreviewer} />
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
    }, [roleplayStats, roomSession, roomPreviewer]);
    const [currentTab, setCurrentTab] = useState<Tab>(inventoryTabs[0]);

    const onClose = () => {
        if (isTrading) stopTrading();

        setIsVisible(false);
    }

    useRoomEngineEvent<RoomEngineObjectPlacedEvent>(RoomEngineObjectEvent.PLACED, event => {
        if (!isObjectMoverRequested()) return;

        setObjectMoverRequested(false);

        if (!event.placedInRoom) setIsVisible(true);
    });

    useRoomSessionManagerEvent<RoomSessionEvent>([
        RoomSessionEvent.CREATED,
        RoomSessionEvent.ENDED
    ], event => {
        console.log('useRoomSessionManagerEvent: ', event);
        switch (event.type) {
            case RoomSessionEvent.CREATED:
                setRoomSession(event.session);
                return;
            case RoomSessionEvent.ENDED:
                setRoomSession(null);
                setIsVisible(false);
                return;
        }
    });

    useMessageEvent<BadgePointLimitsEvent>(BadgePointLimitsEvent, event => {
        const parser = event.getParser();

        for (const data of parser.data) GetLocalization().setBadgePointLimit(data.badgeId, data.limit);
    });

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
        setRoomPreviewer(new RoomPreviewer(GetRoomEngine(), ++RoomPreviewer.PREVIEW_COUNTER));

        return () => {
            setRoomPreviewer(prevValue => {
                prevValue.dispose();

                return null;
            });
        }
    }, []);

    useEffect(() => {
        if (!isVisible && isTrading) setIsVisible(true);
    }, [isVisible, isTrading]);

    useEffect(() => {
        setCurrentTab(inventoryTabs[0]);
    }, [inventoryTabs]);

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