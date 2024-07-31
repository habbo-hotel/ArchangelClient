import { TurfCaptureTimeLeftData, TurfCaptureTimeLeftEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { TurfTimerQuery } from "../../api/roleplay/gang/TurfTimerQuery";

export function useTurfTimer(): TurfCaptureTimeLeftData {
    const [timer, setTimer] = useState<TurfCaptureTimeLeftData>({
        userId: -1,
        username: '',
        figure: '-',
        secondsLeft: -1,
        isCapturing: false,
    });

    useEffect(() => {
        TurfTimerQuery();
    }, []);

    useMessageEvent<TurfCaptureTimeLeftEvent>(TurfCaptureTimeLeftEvent, event => {
        const parser = event.getParser();
        setTimer(parser.data);
    });

    return timer;
}