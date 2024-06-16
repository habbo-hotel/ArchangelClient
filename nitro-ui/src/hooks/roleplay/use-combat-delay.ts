import { useState } from "react";
import { CombatDelayData } from "@nitro-rp/renderer";
import { useMessageEvent } from "../events";
import { CombatDelayEvent } from "@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/combat/CombatDelayEvent";

export function useCombatDelay(): CombatDelayData {
    const [combatDelay, setCombatDelay] = useState<CombatDelayData>({
        combatBlocked: false,
        combatDelayRemaining: 0,
    })

    useMessageEvent<CombatDelayEvent>(CombatDelayEvent, event => {
        const eventData: CombatDelayData = event.getParser().data;
        setCombatDelay(eventData);
    });

    return combatDelay;;
}