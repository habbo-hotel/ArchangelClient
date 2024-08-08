import { FaUsers } from "react-icons/fa";
import { Flex } from "../../../common";
import { useUserOnlineCount } from "../../../hooks/roleplay/use-user-online-count";

export function OnlineUserCount() {
    const usersOnline = useUserOnlineCount();
    return (
        <div className="cash-balance glass-panel neon-border">
            <Flex>
                <FaUsers style={{ marginRight: 8 }} />
                {usersOnline}
            </Flex>
        </div>
    )
}