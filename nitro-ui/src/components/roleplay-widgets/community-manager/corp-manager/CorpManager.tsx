import { CorpList } from "./corp-list/CorpList";
import { CorpProfile } from "./corp-profile/CorpProfile";

export interface CorpManagerProps {
    profileID?: number;
}

export function CorpManager({ profileID }: CorpManagerProps) {
    if (!profileID) {
        return <CorpList />
    }

    return <CorpProfile profileID={profileID} />
}