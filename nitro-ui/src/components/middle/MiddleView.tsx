import { FaMapPin, FaSkull } from 'react-icons/fa';
import { TurfTimer } from './turf-timer/TurfTimer';
import { useNavigator, useSessionInfo } from '../../hooks';
import { Flex, LayoutAvatarImageView, Text } from '../../common';
import { CreateLinkEvent } from '../../api';

export function MiddleView() {
    const { navigatorData = null } = useNavigator();
    const { userInfo } = useSessionInfo();
    console.log(navigatorData)
    return (
        <>
            <div className="nitro-middle">
                <TurfTimer />
            </div>
            <div className="middle-bar">
                <div className="top-bar glass-panel ">
                    <div className="location-info" onClick={() => CreateLinkEvent('navigator/toggle-room-info')} style={{ cursor: 'pointer' }}>
                        <FaMapPin />
                        <Text fontSize={4} variant="white">
                            {navigatorData?.enteredGuestRoom?.roomName}
                        </Text>
                        <Flex gap={4}>
                            {
                                navigatorData?.enteredGuestRoom?.tags?.map(_ => (
                                    <Text fontSize={5} variant="white">
                                        #{_}
                                    </Text>
                                ))
                            }
                        </Flex>
                    </div>
                    <div className="player-info">
                        <Text bold className="level-badge" variant="white" fontSize={6}>
                            <FaSkull style={{ fontSize: 14, marginRight: 8 }} />
                            CRIPS
                        </Text>
                    </div>
                </div>
            </div>
        </>
    )
}