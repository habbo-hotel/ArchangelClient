import { FC } from 'react';
import { Column } from '../../common';
import { OfferView } from '../catalog/views/targeted-offer/OfferView';
import { GroupRoomInformationView } from '../groups/views/GroupRoomInformationView';
import { NotificationCenterView } from '../notification-center/NotificationCenterView';
import { MysteryBoxExtensionView } from '../room/widgets/mysterybox/MysteryBoxExtensionView';
import { RoomPromotesWidgetView } from '../room/widgets/room-promotes/RoomPromotesWidgetView';
import { RoomInformationView } from '../room/RoomInformationView';
import { OnlineUserCount } from './online-user-count/OnlineUserCount';
import { TimeOfDay } from './time-of-day/TimeOfDay';

export const RightSideView: FC<{}> = props => {
    return (
        <div className="nitro-right-side">
            <Column position="relative" gap={1}>
                <OnlineUserCount />
                <TimeOfDay />
                <RoomInformationView />
                <GroupRoomInformationView />
                <MysteryBoxExtensionView />
                <OfferView />
                <RoomPromotesWidgetView />
                <NotificationCenterView />
            </Column>
        </div>
    );
}
