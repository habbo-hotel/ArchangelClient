import { useEffect, useState } from "react";
import { UserOnlineCountEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../events";
import { userOnlineCountQuery } from "../../api/roleplay/user/UserOnlineCountQuery";

export function useUserOnlineCount(): number {
    const [usersOnline, setsUsersOnline] = useState<number>(0);

    useEffect(() => {
        userOnlineCountQuery()
    }, []);

    useMessageEvent<UserOnlineCountEvent>(UserOnlineCountEvent, event => {
        setsUsersOnline(event.getParser().onlineUsers);
    });

    return usersOnline;
}