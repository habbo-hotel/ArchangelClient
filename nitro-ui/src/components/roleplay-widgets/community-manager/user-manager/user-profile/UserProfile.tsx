import { ReactNode, useState } from "react";
import { MyRooms } from "./my-rooms/MyRooms";
import { MyGroups } from "./my-groups/MyGroups";
import { MyBadges } from "./my-badges/MyBadges";
import { MyFriends } from "./my-friends/MyFriends";
import { MyGuestbook } from "./my-guestbook/MyGuestbook";
import { useCorpData } from "../../../../../hooks/roleplay/use-corp-data";
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { Button, Column, Flex, Grid, LayoutAvatarImageView, Text } from "../../../../../common";
import { useCorpPositionData } from "../../../../../hooks/roleplay/use-corp-position-data";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../../api";

interface UserProfileProps {
    profileID: number;
}

interface UserProfileWidget {
    key: string;
    label: ReactNode;
    view: () => ReactNode;
}

const USER_PROFILE_WIDGETS: UserProfileWidget[] = [
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
    {
        key: 'guestbook',
        label: 'Guestbook',
        view: () => <MyGuestbook />,
    },
    {
        key: 'rooms',
        label: 'Rooms',
        view: () => <MyRooms />,
    },
]

export function UserProfile({ profileID }: UserProfileProps) {
    const roleplayStats = useRoleplayStats(profileID);
    const corp = useCorpData(roleplayStats.corporationID);
    const corpPosition = useCorpPositionData(roleplayStats.corporationID, roleplayStats.corporationPositionID)

    const [widget, setWidget] = useState<UserProfileWidget>(USER_PROFILE_WIDGETS[0]);

    return (
        <Grid fullHeight fullWidth gap={4}>
            <Column size={4} fullHeight fullWidth>
                <Button variant="secondary" style={{ width: 'fit-content' }} onClick={() => CreateLinkEvent('users/show')}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
                <div className="profile-card">
                    <div className="profile-header">
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
            <Column size={8} fullHeight gap={0}>
                <div className="tabs">
                    {
                        USER_PROFILE_WIDGETS.map(_ => (
                            <div className={`tab ${widget.key === _.key ? 'active' : ''}`} key={`widget_${_.key}`} onClick={() => setWidget(_)}>
                                {_.label}
                            </div>
                        ))
                    }
                </div>
                <div className="content">
                    {widget.view()}
                </div>
            </Column>
        </Grid>
    )
}