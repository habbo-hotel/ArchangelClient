import { RoleplayStatsContainerProps } from "./RoleplayStatsContainer.types";
import {LayoutAvatarImageView, Text } from "../../../common";
import { LocalizeText } from "../../../api";
import { useState } from "react";
import { useMessageEvent } from "../../../hooks";
import { UserRoleplayStatsChangeEvent } from "@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay";
import { UserRoleplayStatsChangeData } from "@nitro-rp/renderer/src/nitro/communication/messages/parser/roleplay/UserRoleplayStatsChangeParser";


export function RoleplayStatsContainer({ userID }: RoleplayStatsContainerProps) {
    const [roleplayStats, setRoleplayStats] = useState<UserRoleplayStatsChangeData>({
        userID: 0,
        username: '',
        figure: '',
        cashBalance: 0,
        bankBalance: 0,
        healthNow: 0,
        healthMax: 0,
        energyNow: 0,
        energyMax: 0,
        hungerNow: 0,
        hungerMax: 0,
        corporationID: 0,
        corporationPositionID: 0,
        gangID: undefined,
        gangPositionID: undefined,
    })

    useMessageEvent<UserRoleplayStatsChangeEvent>(UserRoleplayStatsChangeEvent, event => {
        const eventData: UserRoleplayStatsChangeData = event.getParser().data;
        console.log(eventData)
        if (eventData.userID !== userID) {
            return;
        }
        setRoleplayStats(eventData);
    });

    const healthPercent = (roleplayStats.healthNow / roleplayStats.healthMax) * 100;
    const energyPercent =  (roleplayStats.energyNow / roleplayStats.energyNow) * 100;
    const hungerPercent =  (roleplayStats.hungerNow / roleplayStats.hungerMax) * 100;

    return (
        <div className="nitro-roleplay-stats-container" >
            <div className="nitro-roleplay-stats rounded-bottom p-1">
                <div className="nitro-roleplay-user">
                    <div className="nitro-roleplay-avatar">
                        <LayoutAvatarImageView className="avatar" figure={ roleplayStats.figure } direction={ 2 } />
                    </div>
                    <Text bold center fontSize={5} variant="white">{roleplayStats.username}</Text>
                </div>
                <div className="p-2 rounded">
                    <Text bold  variant="light">{ LocalizeText('roleplay.stats.bank') }</Text>
                    <div className="nitro-stats-item">
                        <Text bold variant="white">${roleplayStats.bankBalance}</Text>
                    </div>
                </div>
                <div className="p-2 rounded">
                    <Text bold variant="light">{ LocalizeText('roleplay.stats.cash') }</Text>
                    <div className="nitro-stats-item">
                        <Text bold variant="white">${roleplayStats.cashBalance}</Text>
                    </div>
                </div>
                <div className="p-2 rounded">
                    <Text bold variant="light">{ LocalizeText('roleplay.stats.health') }</Text>
                    <progress value={healthPercent} max={roleplayStats.healthMax} />
                </div>
                <div className="p-2 rounded">
                    <Text bold variant="light">{ LocalizeText('roleplay.stats.energy') }</Text>
                    <progress value={energyPercent} max={roleplayStats.energyMax} />
                </div>
                <div className="p-2 rounded">
                    <Text bold variant="light">{ LocalizeText('roleplay.stats.hunger') }</Text>
                    <progress value={hungerPercent} max={roleplayStats.hungerMax} />
                </div>
            </div>
        </div>
    )
}