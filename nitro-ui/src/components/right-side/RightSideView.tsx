import { FC } from 'react';
import { Column, Flex } from '../../common';
import { OfferView } from '../catalog/views/targeted-offer/OfferView';
import { GroupRoomInformationView } from '../groups/views/GroupRoomInformationView';
import { NotificationCenterView } from '../notification-center/NotificationCenterView';
import { MysteryBoxExtensionView } from '../room/widgets/mysterybox/MysteryBoxExtensionView';
import { RoomPromotesWidgetView } from '../room/widgets/room-promotes/RoomPromotesWidgetView';
import { OnlineUserCount } from './online-user-count/OnlineUserCount';
import { TimeOfDay } from './time-of-day/TimeOfDay';
import { CashBalance } from './cash-balance/CashBalance';
import { WeaponWheel } from './weapon-wheel/WeaponWheel';
import { EquippedWeapon } from './equipped-weapon/EquippedWeapon';

export const RightSideView: FC<{}> = props => {
    return (
        <>
            <div className="nitro-right-side">
                <Column position="relative" gap={1}>
                    <CashBalance />
                    <br />
                    <Flex gap={4}>
                        <TimeOfDay />
                        <OnlineUserCount />
                    </Flex>
                    <br />
                    <GroupRoomInformationView />
                    <MysteryBoxExtensionView />
                    <OfferView />
                    <RoomPromotesWidgetView />
                    <NotificationCenterView />
                    <EquippedWeapon />
                    <WeaponWheel />
                </Column>
            </div >
        </>
    );
}
