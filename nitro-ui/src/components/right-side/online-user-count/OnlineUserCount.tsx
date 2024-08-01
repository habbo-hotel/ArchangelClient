import { FaUsers } from "react-icons/fa";
import { Base, Flex, Text } from "../../../common";
import { useUserOnlineCount } from "../../../hooks/roleplay/use-user-online-count";

export function OnlineUserCount() {
    const usersOnline = useUserOnlineCount();
    return (
        <Base className="nitro-notification-bubble rounded">
            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <Flex pointer alignItems="center" gap={2}>
                    <Text bold fontSize={4} variant="white">
                        <FaUsers style={{ marginRight: 8 }} />
                    </Text>
                </Flex>
                <Flex pointer alignItems="center" gap={2}>
                    <Text bold fontSize={5} variant="white">
                        {usersOnline}
                    </Text>
                </Flex>
            </div>
        </Base>
    )
}