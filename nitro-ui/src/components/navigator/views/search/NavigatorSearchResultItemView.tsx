import { RoomDataParser } from '@nitro-rp/renderer';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { CreateRoomSession, DoorStateType, GetSessionDataManager, TryVisitRoom } from '../../../../api';
import { Flex, LayoutGridItemProps, Text } from '../../../../common';
import { useMessageEvent, useNavigator } from '../../../../hooks';
import { CallTaxi } from '../../../../api/roleplay/taxi/CallTaxi';
import { TaxiDispatchedEvent } from '@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/taxi/TaxiDispatchedEvent';

export interface NavigatorSearchResultItemViewProps extends LayoutGridItemProps {
    roomData: RoomDataParser
    taxiFee: number;
}

export function NavigatorSearchResultItemView({ roomData, taxiFee, ...rest }: NavigatorSearchResultItemViewProps) {
    const { setDoorData = null } = useNavigator();

    function visitRoom() {
        if (roomData.ownerId !== GetSessionDataManager().userId) {
            if (roomData.habboGroupId !== 0) {
                TryVisitRoom(roomData.roomId);

                return;
            }

            switch (roomData.doorMode) {
                case RoomDataParser.DOORBELL_STATE:
                    setDoorData(prevValue => {
                        const newValue = { ...prevValue };

                        newValue.roomInfo = roomData;
                        newValue.state = DoorStateType.START_DOORBELL;

                        return newValue;
                    });
                    return;
                case RoomDataParser.PASSWORD_STATE:
                    setDoorData(prevValue => {
                        const newValue = { ...prevValue };

                        newValue.roomInfo = roomData;
                        newValue.state = DoorStateType.START_PASSWORD;

                        return newValue;
                    });
                    return;
            }
        }

        CallTaxi(roomData.roomId);
    }

    useMessageEvent<TaxiDispatchedEvent>(TaxiDispatchedEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        const currentTime = Date.now();
        const delay = parser.arrivesAt - currentTime;

        if (delay <= 0) {
            CreateRoomSession(roomData.roomId);
        } else {
            setTimeout(() => {
                CreateRoomSession(roomData.roomId);
            }, delay);
        }
    });

    return (
        <Flex pointer overflow="hidden" alignItems="center" onClick={visitRoom} gap={2} className="navigator-item px-2 py-1 small" {...rest}>
            <Flex center className="badge p-1 bg-primary" gap={1}>
                <FaUser className="fa-icon" />
                {roomData.userCount}
            </Flex>
            <Text truncate grow>{roomData.roomName}</Text>
            <Flex center className="badge p-1 bg-danger" gap={1}>
                <FaDollarSign className="fa-icon" />
                {taxiFee}
            </Flex>
        </Flex>
    );
}
