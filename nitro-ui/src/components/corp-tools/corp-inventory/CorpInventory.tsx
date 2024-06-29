import { useState } from "react";
import { useCorpData } from "../../../hooks/roleplay/use-corp-data";
import { useMessageEvent } from "../../../hooks";
import { CorpOpenInventoryEvent } from "@nitro-rp/renderer";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from "../../../common";

export function CorpInventory() {
    const [visible, setVisible] = useState(false);
    const [corpData, setCorpData] = useState<{ corpID: number; itemID: number; }>();
    const corp = useCorpData(corpData?.corpID);

    function onClose() {
        setVisible(false);
    }

    useMessageEvent<CorpOpenInventoryEvent>(CorpOpenInventoryEvent, event => {
        const parser = event.getParser();
        setCorpData({ corpID: parser.corpID, itemID: parser.itemID });
        setVisible(true);
    })

    if (!visible || !corpData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="corpInventory" className="nitro-inventory">
            <NitroCardHeaderView headerText="Corp Inventory" onCloseClick={onClose} />
            <NitroCardContentView>
                reee
            </NitroCardContentView>
        </NitroCardView >
    )
}