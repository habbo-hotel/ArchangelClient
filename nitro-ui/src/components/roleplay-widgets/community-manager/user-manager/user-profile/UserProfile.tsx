import { UserLeaderboard } from "../user-leaderboard/UserLeaderboard";

interface UserProfileProps {
    profileID: number;
}

export function UserProfile({ profileID }: UserProfileProps) {
    if (!profileID) {
        return <UserLeaderboard />
    }
    return <UserProfile profileID={profileID} />
}