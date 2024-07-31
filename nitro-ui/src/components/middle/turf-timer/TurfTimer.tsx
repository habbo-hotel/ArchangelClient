import { Text } from "../../../common";
import { useTurfTimer } from "../../../hooks/roleplay/use-turf-timer";

export function TurfTimer() {
    const timer = useTurfTimer();

    console.log(timer);

    if (timer.userId <= 0) {
        return null;
    }

    return (
        <>
            <Text fontSize={1} variant="white">
                turf capture by {timer.username}
                <br />
                {timer.secondsLeft} secs left
            </Text></>
    )
}