import { useEffect, useState } from "react";
import { ILinkEventTracker } from "@nitro-rp/renderer";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";

export function GangProfile() {
    const [gangID, setGangID] = useState<number>();

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');
                if (parts.length < 2) return;
                setGangID(Number(parts[2]));
            },
            eventUrlPrefix: '/gang-profile/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    if (!gangID) {
        return null;
    }

    return (
        <div className="modal" onClick={() => setGangID(undefined)}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    <div className="tab">
                        Gang
                    </div>
                </div>
                <div className="menu-content">
                    why me
                </div>
            </div>
        </div>
    )
}