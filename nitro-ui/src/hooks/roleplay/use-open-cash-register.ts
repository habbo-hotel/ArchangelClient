import { useState } from "react";
import { useMessageEvent } from "../events";
import { CashRegisterData } from "@nitro-rp/renderer/src/nitro/communication/messages/parser/roleplay/corp/CashRegisterParser";
import { CashRegisterEvent } from "@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/corp/CashRegisterEvent";

export function useCashRegister(): CashRegisterData | undefined {
    const [CashRegister, setCashRegister] = useState<CashRegisterData>(undefined);

    useMessageEvent<CashRegisterEvent>(CashRegisterEvent, event => {
        const eventData: CashRegisterData = event.getParser().data;
        setCashRegister(eventData);
    });

    return CashRegister;
}