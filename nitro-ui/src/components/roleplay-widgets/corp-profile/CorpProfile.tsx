import { useEffect, useState } from "react";
import { ILinkEventTracker } from "@nitro-rp/renderer";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { Flex } from "../../../common";

export function CorpProfile() {
    const [corpID, setCorpID] = useState<number>();

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');
                if (parts.length < 2) return;
                setCorpID(Number(parts[2]));
            },
            eventUrlPrefix: '/corp-profile/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    if (!corpID) {
        return null;
    }
    return (
        <div className="modal" onClick={() => setCorpID(undefined)}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    <div className="tab">
                        Corp
                    </div>
                </div>
                <div className="menu-content">
                    why me
                </div>
            </div>
        </div>
    )
}