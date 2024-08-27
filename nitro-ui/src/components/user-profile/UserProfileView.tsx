import { ExtendedProfileChangedMessageEvent, RelationshipStatusInfoEvent, RelationshipStatusInfoMessageParser, RoomEngineObjectEvent, RoomObjectCategory, RoomObjectType, UserCurrentBadgesComposer, UserCurrentBadgesEvent, UserProfileEvent, UserProfileParser, UserRelationshipsComposer } from '@nitro-rp/renderer';
import { FC, useState } from 'react';
import { GetRoomSession, GetSessionDataManager, GetUserProfile, LocalizeText, SendMessageComposer } from '../../api';
import { Column, Grid, NitroCardAccordionSetView, NitroCardAccordionView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useMessageEvent, useRoomEngineEvent } from '../../hooks';
import { BadgesContainerView } from './views/BadgesContainerView';
import { GroupsContainerView } from './views/GroupsContainerView';
import { UserContainerView } from './views/UserContainerView';
import { RoleplayStatsContainerView } from './views/RoleplayStatsContainerView';

export const UserProfileView: FC<{}> = props => {
    const [userProfile, setUserProfile] = useState<UserProfileParser>(null);
    const [userBadges, setUserBadges] = useState<string[]>([]);

    const onClose = () => {
        setUserProfile(null);
        setUserBadges([]);
    }

    const onLeaveGroup = () => {
        if (!userProfile || (userProfile.id !== GetSessionDataManager().userId)) return;

        GetUserProfile(userProfile.id);
    }

    useMessageEvent<UserCurrentBadgesEvent>(UserCurrentBadgesEvent, event => {
        const parser = event.getParser();

        if (!userProfile || (parser.userId !== userProfile.id)) return;

        setUserBadges(parser.badges);
    });

    useMessageEvent<RelationshipStatusInfoEvent>(RelationshipStatusInfoEvent, event => {
        const parser = event.getParser();

        if (!userProfile || (parser.userId !== userProfile.id)) return;
    });

    useMessageEvent<UserProfileEvent>(UserProfileEvent, event => {
        const parser = event.getParser();

        let isSameProfile = false;

        setUserProfile(prevValue => {
            if (prevValue && prevValue.id) isSameProfile = (prevValue.id === parser.id);

            return parser;
        });

        if (!isSameProfile) {
            setUserBadges([]);
        }

        SendMessageComposer(new UserCurrentBadgesComposer(parser.id));
        SendMessageComposer(new UserRelationshipsComposer(parser.id));
    });

    useMessageEvent<ExtendedProfileChangedMessageEvent>(ExtendedProfileChangedMessageEvent, event => {
        const parser = event.getParser();

        if (parser.userId != userProfile?.id) return;

        GetUserProfile(parser.userId);
    });

    useRoomEngineEvent<RoomEngineObjectEvent>(RoomEngineObjectEvent.SELECTED, event => {
        if (!userProfile) return;

        if (event.category !== RoomObjectCategory.UNIT) return;

        const userData = GetRoomSession().userDataManager.getUserDataByIndex(event.objectId);

        if (userData.type !== RoomObjectType.USER) return;

        GetUserProfile(userData.webID);
    });

    if (!userProfile) return null;

    return (
        <NitroCardView uniqueKey="nitro-user-profile" theme="primary-slim" className="user-profile">
            <NitroCardHeaderView headerText={LocalizeText('extendedprofile.caption')} onCloseClick={onClose} />
            <NitroCardContentView overflow="hidden">
                <Grid fullHeight={false} gap={4}>
                    <Column size={6} gap={1} className="user-container pe-2">
                        <UserContainerView userProfile={userProfile} />
                        <Text bold fontSize={5}>Badges</Text>
                        <Grid fullHeight={false} columnCount={5} className="bg-muted rounded px-2 py-1">
                            <BadgesContainerView fullWidth center badges={userBadges} />
                        </Grid>
                        <Text bold fontSize={5}>Groups</Text>
                        <div className="bg-muted rounded px-2 py-1">
                            <GroupsContainerView fullWidth itsMe={userProfile.id === GetSessionDataManager().userId} groups={userProfile.groups} onLeaveGroup={onLeaveGroup} />
                        </div>
                    </Column>
                    <Column size={6}>
                        <RoleplayStatsContainerView userID={userProfile.id} />
                    </Column>
                </Grid>
                <NitroCardAccordionView fullHeight overflow="hidden">
                    <NitroCardAccordionSetView headerText="Advanced Metrics">
                        <Grid className="bg-muted rounded px-2 py-1" columnCount={4} fullHeight={false}>
                            <Column>
                                <Text fontSize={6}>KDR</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Kills</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Melee Kills</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Weapon Kills</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Plants Grown</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Trees Chopped</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Ores Picked</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Fish Caught</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Drugs Taken</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Turfs Caught</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Drugs Sold</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                            <Column>
                                <Text fontSize={6}>Weapons Sold</Text>
                                <Text bold fontSize={4}>1</Text>
                            </Column>
                        </Grid>
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Properties">
                        <Text fontSize={5}>I don't own anything because am broke</Text>
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Achievements" isExpanded>
                        <Text fontSize={5}>1 day I will become senator.</Text>
                    </NitroCardAccordionSetView>
                </NitroCardAccordionView>
            </NitroCardContentView>
        </NitroCardView>
    )
}
