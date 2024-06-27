import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { InfoScreenViewEvent } from "@nitro-rp/renderer";

export function InfoScreen() {
    const [isVisible, setIsVisible] = useState(false)

    useMessageEvent<InfoScreenViewEvent>(InfoScreenViewEvent, event => {
        setIsVisible(true);
    });

    function onClose() {
        setIsVisible(false);
    }

    if (!isVisible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="infoScreen" className="nitro-inventory">
            <NitroCardHeaderView headerText="Info Screen" onCloseClick={onClose} />
            <NitroCardContentView>
                <Text bold size={5}>Hello world</Text>
            </NitroCardContentView>
        </NitroCardView >
    )
}