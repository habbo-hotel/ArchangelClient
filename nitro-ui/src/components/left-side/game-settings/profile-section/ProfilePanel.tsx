

import { Text } from "../../../../common";
import { useSessionInfo } from "../../../../hooks";

export function ProfilePanel() {
    const { userInfo } = useSessionInfo();

    return (
        <>
            <Text bold fontSize={4} variant="white">{userInfo?.username}</Text>
        </>
    )
}