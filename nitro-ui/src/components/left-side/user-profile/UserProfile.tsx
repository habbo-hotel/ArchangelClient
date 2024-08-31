import { ILinkEventTracker } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";

export function UserProfile() {
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');
                if (parts.length < 2) return;


                const username = parts[2];
                setUsername(username);
            },
            eventUrlPrefix: '/user-profile/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    if (!username) {
        return null;
    }

    return (
        <div className="modal" onClick={() => setUsername(undefined)}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    <div className="tab">
                        {username}'s Profile
                    </div>
                </div>
                <div className="menu-content">
                    Hello
                </div>
            </div>
        </div>
    )
}