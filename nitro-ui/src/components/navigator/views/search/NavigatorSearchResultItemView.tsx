import { RoomDataParser } from '@nitro-rp/renderer';
import { FaCar, FaClock, FaDollarSign, FaTaxi, FaUser } from 'react-icons/fa';
import { Flex, LayoutGridItemProps, Text } from '../../../../common';
import { useMessageEvent } from '../../../../hooks';
import { TaxiDispatchedEvent } from '@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/taxi/TaxiDispatchedEvent';
import { useEffect, useState } from 'react';

export interface NavigatorSearchResultItemViewProps extends LayoutGridItemProps {
    disabled: boolean;
    roomData: RoomDataParser;
    onVisitRoom(): void;
    taxiFee: number;
}

export function NavigatorSearchResultItemView({ roomData, disabled, onVisitRoom, taxiFee, ...rest }) {
    const [arrivesAt, setArrivesAt] = useState<number>();
    const [remainingSecs, setRemainingSecs] = useState<number>(0);

    useMessageEvent<TaxiDispatchedEvent>(TaxiDispatchedEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        if (parser.roomID === roomData.roomId) {
            setArrivesAt(parser.arrivesAt);
            return;
        }
        if (arrivesAt) {
            setArrivesAt(null);
        }
    });

    useEffect(() => {
        if (arrivesAt === null || arrivesAt === undefined) return;

        const updateRemainingSecs = () => {
            const currentTime = Math.floor(Date.now() / 1000);
            const diffSecs = arrivesAt - currentTime;
            if (diffSecs <= 0) {
                setRemainingSecs(0);
                setArrivesAt(null);
                return;
            }
            setRemainingSecs(diffSecs);
        };

        updateRemainingSecs();

        const interval = setInterval(updateRemainingSecs, 1000);

        return () => clearInterval(interval);
    }, [arrivesAt]);

    return (
        <Flex pointer overflow="hidden" alignItems="center" onClick={onVisitRoom} gap={2} className="navigator-item px-2 py-1 small" {...rest}>
            <Flex center className="badge p-1 bg-primary" gap={1}>
                <FaUser className="fa-icon" />
                {roomData.userCount}
            </Flex>
            <Text truncate grow>{roomData.roomName}</Text>
            {!!arrivesAt && (
                <Flex center className="badge p-1 bg-success" gap={1}>
                    <FaClock className="fa-icon" />
                    {remainingSecs} secs
                </Flex>
            )}
            {
                !arrivesAt && !disabled && (
                    <Flex center className="badge p-1 bg-danger" gap={1}>
                        <FaDollarSign className="fa-icon" />
                        {taxiFee}
                    </Flex>
                )
            }
        </Flex>
    );
}