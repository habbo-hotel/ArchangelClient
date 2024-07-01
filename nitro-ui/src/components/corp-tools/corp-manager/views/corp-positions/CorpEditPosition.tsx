import { Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";

export interface CorpEditPositionProps extends CorpManagerViewProps {
    corpPositionID: number;
}
export function CorpEditPosition({ corpID, corpPositionID }: CorpEditPositionProps) {
    return (
        <>
            <Text bold>{corpID}</Text>
            <Text bold>{corpPositionID}</Text>
        </>
    )
}