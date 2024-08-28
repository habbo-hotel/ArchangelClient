import { RoleplayStatsContainer } from "./roleplay-stats-container/RoleplayStatsContainer";
import { useAvatarInfoWidget, useSessionInfo } from "../../../hooks";
import { AvatarInfoUser } from "../../../api";
import { useEffect, useState } from "react";

export function TargetRoleplayStats() {
    const session = useSessionInfo();
    const [targetUserID, setTargetUserID] = useState<number>();
    const { avatarInfo = null, setAvatarInfo } = useAvatarInfoWidget();

    function onToggle() {
        setAvatarInfo(null)
        setTargetUserID(undefined);
    }

    useEffect(() => {
        if (avatarInfo?.type === AvatarInfoUser.PEER) {
            if ((avatarInfo as AvatarInfoUser).webID === session?.userInfo?.userId) {
                return;
            }
            setTargetUserID((avatarInfo as AvatarInfoUser).webID)
        }
    }, [targetUserID, avatarInfo]);

    if (!targetUserID) {
        return null;
    }

    return <RoleplayStatsContainer userID={targetUserID} onToggle={onToggle} />

}