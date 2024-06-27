import { BankOpenComputerEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";
import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { LookupAccount } from "./views/LookupAccount";
import { SetupComputer } from "./views/SetupComputer";

export function BankComputer() {
    const [isVisible, setIsVisible] = useState(false)
    const [computerData, setComputerData] = useState<{ itemID: number; corpID: number }>();

    useMessageEvent<BankOpenComputerEvent>(BankOpenComputerEvent, event => {
        setIsVisible(true);
        setComputerData({ itemID: event.getParser().itemID, corpID: event.getParser().corpID })
    });

    function onClose() {
        setIsVisible(false);
    }

    if (!isVisible || !computerData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="bankComputer" className="nitro-inventory">
            <NitroCardHeaderView headerText="Bank Computer" onCloseClick={onClose} />
            <NitroCardContentView>
                {
                    computerData.corpID
                        ? <LookupAccount bankCorpID={computerData.corpID} onClose={onClose} />
                        : <SetupComputer itemID={computerData.itemID} onClose={onClose} />
                }
            </NitroCardContentView>
        </NitroCardView >
    )
}