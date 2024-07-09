import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { timeOfDayQuery } from "../../api/roleplay/game/TimeOfDayQuery";
import { TimeOfDayEvent } from "@nitro-rp/renderer";

export function useServerTime(): string {
    const [timeOfDay, setTimeOfDay] = useState('0:00');

    useEffect(() => {
        timeOfDayQuery();
    }, []);

    useMessageEvent<TimeOfDayEvent>(TimeOfDayEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        setTimeOfDay(parser.serverTime);
    });

    return timeOfDay;
}