export interface UserManagerProps {
    profileID?: number;
}

export function UserManager({ profileID }: UserManagerProps) {
    return (
        <>
            User {profileID ? `#${profileID}` : ''}
        </>
    )
}