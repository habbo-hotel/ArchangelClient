import { BadgePointLimitsEvent, ILinkEventTracker, IRoomSession, RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomPreviewer, RoomSessionEvent } from '@nitro-rp/renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, GetLocalization, GetRoomEngine, LocalizeText, RemoveLinkEventTracker, isObjectMoverRequested, setObjectMoverRequested } from '../../api';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../common';
import { useInventoryTrade, useMessageEvent, useRoomEngineEvent, useRoomSessionManagerEvent } from '../../hooks';
import { UserInventory } from './views/UserInventory';
import { InventoryFurnitureView } from './components/furniture/InventoryFurnitureView';


export const InventoryView: FC<{}> = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isTrading = false, stopTrading = null } = useInventoryTrade();
    const [roomSession, setRoomSession] = useState<IRoomSession>(null);
    const [roomPreviewer, setRoomPreviewer] = useState<RoomPreviewer>(null);
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

    if (!isVisible) return null;

    return (
        <NitroCardView uniqueKey={'inventory'} className="nitro-inventory" theme={isTrading ? 'primary-slim' : ''} >
            <NitroCardHeaderView headerText={LocalizeText('inventory.title')} onCloseClick={onClose} />
            <NitroCardContentView>
                <InventoryFurnitureView roomSession={roomSession} roomPreviewer={roomPreviewer} />
            </NitroCardContentView>
        </NitroCardView >
    );
}