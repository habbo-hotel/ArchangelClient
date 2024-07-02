import { CorpPositionListData, CorpPositionListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { CorpPositionList } from "../../api/roleplay/corp/CorpPositionList";

export function useCorpPositionList(corpID: number): Array<CorpPositionListData> {
    const [corpPositions, setCorpPositions] = useState<CorpPositionListData[]>([]);

    useEffect(() => {
        CorpPositionList(corpID);
    }, [corpID]);

    useMessageEvent<CorpPositionListEvent>(CorpPositionListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        setCorpPositions(parser.corpPositions);
    });

    return corpPositions;
}