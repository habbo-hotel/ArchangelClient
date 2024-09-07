import { GangProfile } from "./gang-profile/GangProfile";
import { GangLeaderboard } from "./gang-leaderboard/GangLeaderboard";

export interface GangManagerProps {
    profileID?: number;
}

export function GangManager({ profileID }: GangManagerProps) {
    if (!profileID) {
        return <GangLeaderboard />
    }
    return <GangProfile profileID={profileID} />
}