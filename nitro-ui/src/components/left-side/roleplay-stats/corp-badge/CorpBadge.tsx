import { CreateLinkEvent } from "../../../../api";
import { LayoutBadgeImageView } from "../../../../common";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { CorpBadgeProps } from "./CorpBadge.types";

export function CorpBadge({ corpID }: CorpBadgeProps) {
    const corpData = useCorpData(corpID);

    return (
        <div style={{ cursor: 'pointer', background: 'red', pointerEvents: 'all' }} onClick={() => CreateLinkEvent(`corp-profile/${corpID}`)} >
            <LayoutBadgeImageView badgeCode={corpData.badgeCode} showInfo={true} isGroup customTitle={corpData.name} />
        </div>
    )
}