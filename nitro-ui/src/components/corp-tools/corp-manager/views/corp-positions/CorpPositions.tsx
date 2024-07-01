import { useEffect, useState } from "react";
import { Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { useMessageEvent } from "../../../../../hooks";
import { CorpPositionListEvent } from "@nitro-rp/renderer";
import { CorpPositionList } from "../../../../../api/roleplay/corp/CorpPositionList";

export function CorpPositions({ corpID }: CorpManagerViewProps) {
    const [corpPositionIDs, setCorpPositionIDs] = useState<Array<number>>([]);

    useEffect(() => {
        CorpPositionList(corpID);
    }, [corpID]);

    useMessageEvent<CorpPositionListEvent>(CorpPositionListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        setCorpPositionIDs(parser.corpPositionIDs);
    })

    return (
        <>
            <Text fontSize={5}>Positions ({corpPositionIDs.length})</Text>
            {
                corpPositionIDs.map(_ => <Text>{_} it works</Text>)
            }
            {
                corpPositionIDs.length === 0 && (
                    <Text>No positions found</Text>
                )
            }
        </>
    )
}