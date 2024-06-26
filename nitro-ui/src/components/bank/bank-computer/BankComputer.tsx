import { BankOpenComputerEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";
import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";

export function BankComputer() {
    const [isVisible, setIsVisible] = useState(false)
    const [atmData, setATMData] = useState<{ itemID: number; corpID: number }>();

    useMessageEvent<BankOpenComputerEvent>(BankOpenComputerEvent, event => {
        setIsVisible(true);
        setATMData({ itemID: event.getParser().itemID, corpID: event.getParser().corpID })
    });

    function onClose() {
        setIsVisible(false);
    }

    if (!isVisible || !atmData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="bankComputer" className="nitro-inventory">
            <NitroCardHeaderView headerText="Bank Computer" onCloseClick={onClose} />
            <NitroCardContentView>
                <Text>don't discuss it.</Text>
            </NitroCardContentView>
        </NitroCardView >
    )
}