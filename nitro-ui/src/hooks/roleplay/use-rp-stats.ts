import { useEffect, useState } from "react";
import { UserRoleplayStatsChangeData, UserRoleplayStatsChangeEvent } from "@nitro-rp/renderer";
import { UserRoleplayStatsQuery } from "../../api/roleplay/user/UserRoleplayStatsQuery";
import { useMessageEvent } from "../events";

export function useRoleplayStats(userID: number): UserRoleplayStatsChangeData {
    const [roleplayStats, setRoleplayStats] = useState<UserRoleplayStatsChangeData>({
        userID: 0,
        username: '',
        figure: '',
        cashBalance: 0,
        bankBalance: 0,
        isDead: false,
        isCuffed: false,
        isStunned: false,
        escortedByUserID: 0,
        healthNow: 0,
        healthMax: 0,
        energyNow: 0,
        energyMax: 0,
        hungerNow: 0,
        hungerMax: 0,
        corporationID: 0,
        corporationPositionID: 0,
        isWorking: false,
        gangID: undefined,
    })

    useEffect(() => {
        setRoleplayStats({
            userID: 0,
            username: '',
            figure: '',
            cashBalance: 0,
            bankBalance: 0,
            isDead: false,
            isCuffed: false,
            isStunned: false,
            escortedByUserID: 0,
            healthNow: 0,
            healthMax: 0,
            energyNow: 0,
            energyMax: 0,
            hungerNow: 0,
            hungerMax: 0,
            corporationID: 0,
            corporationPositionID: 0,
            isWorking: false,
            gangID: undefined,
        })
        UserRoleplayStatsQuery(userID)
    }, [userID]);

    useMessageEvent<UserRoleplayStatsChangeEvent>(UserRoleplayStatsChangeEvent, event => {
        const eventData: UserRoleplayStatsChangeData = event.getParser().data;
        if (eventData.userID !== userID) {
            return;
        }
        setRoleplayStats(eventData);
    });

    return roleplayStats;
}