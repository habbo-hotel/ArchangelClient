import { CorpBadgeProps } from "./CorpBadge.types";
import { useCorpData } from "../../../hooks/roleplay/use-corp-data";
import { LayoutBadgeImageView } from "../../../common";

export function CorpBadge({ corpID }: CorpBadgeProps) {
    const corpData = useCorpData(corpID);

    return <LayoutBadgeImageView badgeCode={corpData.badgeCode} showInfo={true} isGroup customTitle={corpData.name} />
}