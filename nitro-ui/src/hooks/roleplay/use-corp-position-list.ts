import { CorpPositionInfoData, CorpPositionInfoQueryEvent, CorpPositionListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { CorpPositionList } from "../../api/roleplay/corp/CorpPositionList";
import { CorpPositionInfoQuery } from "../../api/roleplay/corp/CorpPositionInfoQuery";

export function useCorpPositionList(corpID: number): Array<CorpPositionInfoData> {
    const [corpPositions, setCorpPositions] = useState<CorpPositionInfoData[]>([]);

    useEffect(() => {
        CorpPositionList(corpID);
    }, [corpID]);

    useMessageEvent<CorpPositionListEvent>(CorpPositionListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        for (const positionID of parser.corpPositionIDs) {
            CorpPositionInfoQuery(corpID, positionID);
        }
    });


    useMessageEvent<CorpPositionInfoQueryEvent>(CorpPositionInfoQueryEvent, event => {
        const parser = event.getParser();
        if (parser.data.corpID !== corpID) {
            return;
        }
        setCorpPositions(_ => {
            const newPositions = [..._];

            const positionIndex = newPositions.findIndex(_ => _.id === parser.data.id);

            if (positionIndex === -1) {
                newPositions.push(parser.data);
                return newPositions;
            }

            newPositions[positionIndex] = parser.data;
            return newPositions;
        })
    })

    return corpPositions;
}