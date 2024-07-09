import { FriendlyTime, UserProfileParser } from '@nitro-rp/renderer';
import { LocalizeText } from '../../../api';
import { Column, Flex, LayoutAvatarImageView, Text } from '../../../common';

interface UserContainerViewProps {
    userProfile: UserProfileParser;
}

export function UserContainerView({ userProfile }: UserContainerViewProps) {
    return (
        <Flex gap={2}>
            <Column center className="avatar-container">
                <LayoutAvatarImageView figure={userProfile.figure} direction={2} />
            </Column>
            <Column>
                <br />
                <Column gap={0}>
                    <Text bold fontSize={4}>{userProfile.username}</Text>
                    <Text italics textBreak small>{userProfile.motto}&nbsp;</Text>
                </Column>
                <Column gap={1}>
                    <Text small>
                        <b>{LocalizeText('extendedprofile.created')}</b> {userProfile.registration}
                    </Text>
                    <Text small>
                        <b>{LocalizeText('extendedprofile.last.login')}</b> {FriendlyTime.format(userProfile.secondsSinceLastVisit, '.ago', 2)}
                    </Text>
                </Column>
            </Column>
        </Flex>
    )
}
