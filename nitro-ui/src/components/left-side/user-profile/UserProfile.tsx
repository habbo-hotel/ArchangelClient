import { useEffect, useState } from "react";
import { FaBuilding, FaSkull } from "react-icons/fa";
import { ILinkEventTracker } from "@nitro-rp/renderer";
import { Flex, LayoutAvatarImageView, Text } from "../../../common";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker } from "../../../api";

export function UserProfile() {
    const [userID, setUserID] = useState<number>();
    const roleplayStats = useRoleplayStats(userID);

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');
                if (parts.length < 2) return;
                setUserID(Number(parts[2]));
            },
            eventUrlPrefix: '/user-profile/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    function onViewCorp() {
        CreateLinkEvent(`/corp-profile/${roleplayStats.corporationID}`)
        setUserID(undefined);
    }

    function onViewGang() {
        CreateLinkEvent(`/gang-profile/${roleplayStats.gangID}`)
        setUserID(undefined);
    }

    if (!userID) {
        return null;
    }

    return (
        <div className="modal" onClick={() => setUserID(undefined)}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    <div className="tab">
                        {roleplayStats.username}'s Profile
                    </div>
                </div>
                <div className="menu-content">
                    <div className="menu-sidebar">
                        <div className="menu-item active">
                            <Flex style={{ height: 50, overflow: 'hidden' }}>
                                <LayoutAvatarImageView figure={roleplayStats.figure} direction={2} headOnly style={{ height: 80, width: 80 }} />
                                <Text bold fontSize={4} style={{ marginTop: 15 }} variant="white">{roleplayStats.username}</Text>
                            </Flex>
                        </div>
                        <div className="menu-item" onClick={onViewCorp}>
                            <FaBuilding style={{ marginRight: 8 }} />
                            My Job
                        </div>
                        {
                            roleplayStats.gangID ?
                                (
                                    <div className="menu-item" onClick={onViewGang}>
                                        <FaSkull style={{ marginRight: 8 }} />
                                        My Gang
                                    </div>
                                )
                                : ''
                        }
                    </div>
                    <div className="menu-settings">
                        hello world
                    </div>
                </div>
            </div>
        </div>
    )
}