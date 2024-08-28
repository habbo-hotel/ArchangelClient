import { LayoutBadgeImageView } from "../../../../common";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { CorpBadgeProps } from "./CorpBadge.types";

export function CorpBadge({ corpID }: CorpBadgeProps) {
    const corpData = useCorpData(corpID);

    return <LayoutBadgeImageView badgeCode={corpData.badgeCode} showInfo={true} isGroup customTitle={corpData.name} />
}