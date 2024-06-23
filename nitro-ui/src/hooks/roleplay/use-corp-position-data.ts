import { CorpPositionInfoData, CorpPositionInfoQueryEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { CorpPositionInfoQuery } from "../../api/roleplay/corp/CorpPositionInfoQuery";

export function useCorpPositionData(corpID: number, corpPositionID: number): CorpPositionInfoData {
    const [corpPositionData, setCorpPositionData] = useState<CorpPositionInfoData>({
        id: 0,
        corpID: 0,
        name: '',
        desc: '',
        canHire: false,
        canFire: false,
        canPromote: false,
        canDemote: false,
        canWorkAnywhere: false,
    });

    useEffect(() => {
        if (corpPositionID === corpPositionData.id) {
            return;
        }
        CorpPositionInfoQuery(corpID, corpPositionID);
    }, [corpID, corpPositionID]);

    useMessageEvent<CorpPositionInfoQueryEvent>(CorpPositionInfoQueryEvent, event => {
        const eventData: CorpPositionInfoData = event.getParser().data;
        if (eventData.corpID !== corpID || eventData.corpID == corpPositionID) {
            return;
        }
        setCorpPositionData(eventData);
    });

    return corpPositionData;
}
