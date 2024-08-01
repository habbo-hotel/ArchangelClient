import { FaClock } from "react-icons/fa";
import { Base, Flex, Text } from "../../../common";
import { useEffect, useState } from "react";
import { TimeOfDayEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";
import { timeOfDayQuery } from "../../../api/roleplay/game/TimeOfDayQuery";

export function TimeOfDay() {
    const [timeOfDay, setTimeOfDay] = useState('0:00');

    useEffect(() => {
        timeOfDayQuery();
    }, []);

    useMessageEvent<TimeOfDayEvent>(TimeOfDayEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        setTimeOfDay(parser.serverTime);
    });

    return (
        <Base className="nitro-notification-bubble rounded">
            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <Flex pointer alignItems="center" gap={2}>
                    <Text bold fontSize={4} variant="white">
                        <FaClock style={{ marginRight: 8 }} />
                    </Text>
                </Flex>
                <Flex pointer alignItems="center" gap={2}>
                    <Text bold fontSize={5} variant="white">
                        {timeOfDay}
                    </Text>
                </Flex>
            </div>
        </Base>
    )
}