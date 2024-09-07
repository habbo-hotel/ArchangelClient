export interface CorpManagerProps {
    profileID?: number;
}

export function CorpManager({ profileID }: CorpManagerProps) {
    return (
        <>
            Corp {profileID ? `#${profileID}` : ''}
        </>
    )
}