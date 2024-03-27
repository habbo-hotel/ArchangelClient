import { RoleplayStatsContainerProps } from "./RoleplayStatsContainer.types";
import {LayoutAvatarImageView, Text } from "../../../common";
import { LocalizeText } from "../../../api";
import { usePurse, useSessionInfo } from "../../../hooks";

export function RoleplayStatsContainer({ }: RoleplayStatsContainerProps) {
    const { userFigure = null, userInfo, p } = useSessionInfo();
    const { getCurrencyAmount } = usePurse();

    return (
    <div className="nitro-roleplay-stats-container" >
        <div className="nitro-roleplay-stats rounded-bottom p-1">
            <div className="nitro-roleplay-user">
                <div className="nitro-roleplay-avatar">
                    <LayoutAvatarImageView className="avatar" figure={ userFigure } direction={ 2 } />
                </div>
                <Text bold center fontSize={5} variant="white">{ userInfo?.username ?? '-'}</Text>
            </div>
            <div className="p-2 rounded">
                <Text bold  variant="light">{ LocalizeText('roleplay.stats.bank') }</Text>
                <div className="nitro-stats-item">
                    <Text bold variant="white">$0</Text>
                </div>
            </div>
            <div className="p-2 rounded">
                <Text bold variant="light">{ LocalizeText('roleplay.stats.cash') }</Text>
                <div className="nitro-stats-item">
                    <Text bold variant="white">${getCurrencyAmount(-1)}</Text>
                </div>
            </div>
            <div className="p-2 rounded">
                <Text bold variant="light">{ LocalizeText('roleplay.stats.health') }</Text>
                <progress value={100} max={100} />
            </div>
            <div className="p-2 rounded">
                <Text bold variant="light">{ LocalizeText('roleplay.stats.energy') }</Text>
                <progress value={100} max={100} />
            </div>
        </div>
    </div>
    )
}