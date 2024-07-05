import { CorpListData, CorpListEvent, CorpPositionListData, CorpPositionListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { CorpList } from "../../api/roleplay/corp/CorpList";

export function useCorpList(): Array<CorpListData> {
    const [corps, setCorps] = useState<CorpListData[]>([]);

    useEffect(() => {
        CorpList();
    }, []);

    useMessageEvent<CorpListEvent>(CorpListEvent, event => {
        const parser = event.getParser();
        setCorps(parser.corps);
    });

    return corps;
}