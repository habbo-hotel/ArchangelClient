import { FaClock } from "react-icons/fa";
import { Flex } from "../../../common";
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
        <div className="cash-balance glass-panel ">
            <Flex>
                <FaClock style={{ marginRight: 8 }} />
                {timeOfDay}
            </Flex>
        </div>
    )
}