
import { ILinkEventTracker } from "@nitro-rp/renderer";
import { ReactNode, useEffect, useState } from "react";
import { UserManager } from "./user-manager/UserManager";
import { GangManager } from "./gang-manager/GangManager";
import { CorpManager } from "./corp-manager/CorpManager";
import { FaBuilding, FaIdCard, FaSkull } from "react-icons/fa";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";

interface CommunityManagerView {
    key: string;
    label: ReactNode;
    render: (id?: number) => ReactNode;
}

const COMMUNITY_MANAGER_VIEWS: CommunityManagerView[] = [
    {
        key: 'users',
        label: (
            <>
                <FaIdCard style={{ marginRight: 8 }} />
                Users
            </>
        ),
        render: (id?: number) => <UserManager profileID={id} />,
    },
    {
        key: 'corps',
        label: (
            <>
                <FaBuilding style={{ marginRight: 8 }} />
                Corps
            </>
        ),
        render: (id?: number) => <CorpManager profileID={id} />,
    },
    {
        key: 'gangs',
        label: (
            <>
                <FaSkull style={{ marginRight: 8 }} />
                Gangs
            </>
        ),
        render: (id?: number) => <GangManager profileID={id} />,
    },
]


export function CommunityManager() {
    const [profileID, setProfileID] = useState<number>();
    const [view, setView] = useState<CommunityManagerView>();

    function onClose() {
        setView(undefined);
        setProfileID(undefined);
    }

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 1) return;

                const tab = COMMUNITY_MANAGER_VIEWS.find(_ => _.key === parts[0]);

                if (!tab) {
                    return;
                }

                setView(tab);
                setProfileID(!Number.isNaN(parts[1]) ? Number(parts[1]) : undefined);
            },
            eventUrlPrefix: ''
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    if (!view) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    {
                        COMMUNITY_MANAGER_VIEWS.map(_ => (
                            <div className={`tab ${view.key === _.key ? 'active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setView(_)}>
                                {_.label}
                            </div>
                        ))
                    }

                </div>
                <div className="menu-content">
                    {view.render(profileID)}
                </div>
            </div>
        </div>
    )
}