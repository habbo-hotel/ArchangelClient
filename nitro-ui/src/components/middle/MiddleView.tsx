import { FaMapPin } from 'react-icons/fa';
import { TurfTimer } from './turf-timer/TurfTimer';
import { useNavigator, useSessionInfo } from '../../hooks';
import { Flex, LayoutAvatarImageView, Text } from '../../common';

export function MiddleView() {
    const { navigatorData = null } = useNavigator();
    const { userInfo } = useSessionInfo();
    console.log(navigatorData)
    return (
        <>
            <div className="nitro-middle">
                <TurfTimer />
            </div>
            <div className="top-bar glass-panel neon-border">
                <div className="location-info">
                    <FaMapPin />  {navigatorData?.enteredGuestRoom?.roomName}
                    <Flex gap={4}>
                        {
                            navigatorData?.enteredGuestRoom?.tags?.map(_ => (
                                <Text fontSize={6} variant="white">
                                    #{_}
                                </Text>
                            ))
                        }
                    </Flex>
                </div>
                <div className="player-info">

                    <div className="avatar">
                        <div className="avatar-image" >
                            <LayoutAvatarImageView figure={userInfo?.figure} direction={2} style={{ height: 125, marginTop: -35 }} />
                        </div>
                    </div>
                    <Text bold className="level-badge" variant="white" fontSize={6}>LVL 1</Text>
                    <Text bold variant="white" fontSize={5}>{userInfo?.username}</Text>
                </div>
            </div>
        </>
    )
}