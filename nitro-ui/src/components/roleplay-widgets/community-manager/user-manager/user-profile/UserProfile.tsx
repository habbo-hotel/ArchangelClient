import { useState } from "react";
import { MyRooms } from "./my-rooms/MyRooms";
import { MyGroups } from "./my-groups/MyGroups";
import { MyBadges } from "./my-badges/MyBadges";
import { MyFriends } from "./my-friends/MyFriends";
import { useCorpData } from "../../../../../hooks/roleplay/use-corp-data";
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../../common";
import { useCorpPositionData } from "../../../../../hooks/roleplay/use-corp-position-data";
import { FaCaretLeft, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../../api";
import { MySkills } from "./my-skills/MySkills";
import { MyStats } from "./my-stats/MyStats";
import { TabWidget } from "../../../../../common/TabWidget";

interface UserProfileProps {
    profileID: number;
}

const SOCIAL_WIDGETS: TabWidget[] = [
    {
        key: 'badges',
        label: 'Badges',
        view: () => <MyBadges />,
    },
    {
        key: 'friends',
        label: 'Friends',
        view: () => <MyFriends />,
    },
    {
        key: 'groups',
        label: 'Groups',
        view: () => <MyGroups />,
    },
]

const ROLEPLAY_WIDGETS: TabWidget[] = [
    {
        key: 'stats',
        label: 'Stats',
        view: () => <MyStats />,
    },
    {
        key: 'experience',
        label: 'Experience',
        view: () => <MySkills />,
    },
    {
        key: 'rooms',
        label: 'Properties',
        view: () => <MyRooms />,
    },
]
export function UserProfile({ profileID }: UserProfileProps) {
    const roleplayStats = useRoleplayStats(profileID);
    const corp = useCorpData(roleplayStats.corporationID);
    const corpPosition = useCorpPositionData(roleplayStats.corporationID, roleplayStats.corporationPositionID)

    return (
        <Grid fullHeight fullWidth gap={4}>
            <Column size={4} fullHeight fullWidth>
                <Flex justifyContent="between">
                    <Button variant="secondary" style={{ width: 'fit-content' }} onClick={() => CreateLinkEvent('users/show')}>
                        <FaCaretLeft style={{ marginRight: 8 }} />
                        Go back
                    </Button>
                    <Button variant="success" style={{ width: 'fit-content' }} onClick={() => CreateLinkEvent('users/show')}>
                        <FaPencilAlt style={{ marginRight: 8 }} />
                        Edit Profile
                    </Button>
                </Flex>
                <div className="profile-card">
                    <div className="profile-header" style={{ background: 'url(https://j.gifs.com/rR9pv4.gif)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="overlay" />
                        <div className="avatar-placeholder">
                            <LayoutAvatarImageView figure={roleplayStats.figure} direction={2} style={{ height: 200, marginTop: -30 }} />
                        </div>
                        <h2>{roleplayStats.username}</h2>
                        <p>{corpPosition?.name} @ {corp?.name}</p>
                    </div>

                    <div className="profile-details">
                        <p><strong>Avatar created:</strong> 11/2007</p>
                        <p><strong>Last login:</strong> 30/08/2020</p>
                        <p className="status">offline</p>
                    </div>

                    <div className="profile-footer">
                        <div className="level">
                            <strong>LEVEL</strong><br />
                            <Text fontSize={4}>29</Text>
                        </div>
                        <div className="friends">
                            <strong>Friends</strong><br />
                            <Text fontSize={4}>27/550</Text>
                        </div>
                    </div>
                </div>
            </Column>
            <Column size={8} fullHeight gap={4}>
                <NitroCardAccordionView fullHeight overflow="hidden">
                    <NitroCardAccordionSetView headerText="Badges" isExpanded>
                        <MyBadges />
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Friends">
                        <MyFriends />
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Groups">
                        <MyGroups />
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Stats">
                        <MyStats />
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Experience">
                        <MySkills />
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Properties">
                        <MyRooms />
                    </NitroCardAccordionSetView>
                </NitroCardAccordionView>
            </Column>
        </Grid >
    )
}