import { ChangeEvent } from "react";
import { CorpPositionInfoData } from "@nitro-rp/renderer";
import { useCorpPositionList } from "../../hooks/roleplay/use-corp-position-list";

export interface CorpPositionSelectProps {
    corpID: number;
    corpPositionID: number;
    onChange(newCorpPosition: CorpPositionInfoData): void;
}

export function CorpPositionSelect({ corpID, corpPositionID, onChange }: CorpPositionSelectProps) {
    const corpPositions = useCorpPositionList(corpID);

    function onChangeCorpPosition(event: ChangeEvent<HTMLSelectElement>) {
        const matchingCorpPosition = corpPositions.find(_ => _.id === Number(event.currentTarget.value));
        if (!matchingCorpPosition) {
            return;
        }
        onChange(matchingCorpPosition);
    }

    return (
        <select style={{ width: '100%', padding: 14 }} value={corpPositionID} onChange={onChangeCorpPosition}>            {
            !corpPositionID && <option selected disabled>Select a position</option>
        }
            {
                corpPositions.map(corpPosition => (
                    <option key={`corp_position_${corpPosition.id}`} value={corpPosition.id}>
                        {corpPosition.name}
                    </option>
                ))
            }
        </select>
    )
}