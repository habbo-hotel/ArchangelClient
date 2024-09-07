import { UserProfile } from "./user-profile/UserProfile";
import { UserLeaderboard } from "./user-leaderboard/UserLeaderboard";

export interface UserManagerProps {
    profileID?: number;
}

export function UserManager({ profileID }: UserManagerProps) {
    console.log({ profileID })
    if (!profileID) {
        return <UserLeaderboard />
    }

    return <UserProfile profileID={profileID} />
}