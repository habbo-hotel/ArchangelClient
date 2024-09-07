export interface GangManagerProps {
    profileID?: number;
}

export function GangManager({ profileID }: GangManagerProps) {
    return (
        <>
            Gang {profileID ? `#${profileID}` : ''}
        </>
    )
}