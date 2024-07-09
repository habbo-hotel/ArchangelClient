import { useNavigator } from '../../hooks';
import { Base, Flex, Text } from '../../common';

export function RoomInformationView() {
    const { navigatorData = null } = useNavigator();
    if (!navigatorData?.enteredGuestRoom) return null;

    return (
        <Base className="nitro-notification-bubble rounded">
            <Flex pointer alignItems="center" gap={2} fullWidth>
                <Text bold fontSize={4} variant="white">{navigatorData.enteredGuestRoom.roomName}</Text>
            </Flex>
            <Flex pointer alignItems="center" gap={2} fullWidth>
                {
                    navigatorData.enteredGuestRoom.tags.map(tag => (
                        <Text bold fontSize={6} variant="white">#{tag}</Text>
                    ))
                }
            </Flex>
        </Base>
    );
};
