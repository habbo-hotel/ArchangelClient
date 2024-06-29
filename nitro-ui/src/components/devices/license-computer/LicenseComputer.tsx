import { LicenseComputerData, LicenseOpenComputerEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";
import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { LookupLicense } from "./views/LookupLicense";
import { SetupComputer } from "./views/SetupComputer";

export function LicenseComputer() {
    const [isVisible, setIsVisible] = useState(false)
    const [computerData, setComputerData] = useState<LicenseComputerData>();

    useMessageEvent<LicenseOpenComputerEvent>(LicenseOpenComputerEvent, event => {
        setIsVisible(true);
        setComputerData(event.getParser().data);
    });

    function onClose() {
        setIsVisible(false);
    }

    if (!isVisible || !computerData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="licenseComputer" className="nitro-inventory">
            <NitroCardHeaderView headerText="License Computer" onCloseClick={onClose} />
            <NitroCardContentView>
                {
                    computerData.corpID
                        ? <LookupLicense licenseType={computerData.licenseType} corpID={computerData.corpID} onClose={onClose} />
                        : <SetupComputer itemID={computerData.itemID} onClose={onClose} />
                }
            </NitroCardContentView>
        </NitroCardView >
    )
}