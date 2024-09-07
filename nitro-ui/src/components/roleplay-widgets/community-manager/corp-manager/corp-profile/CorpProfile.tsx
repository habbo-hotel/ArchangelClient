interface CorpProfileProps {
    profileID: number;
}

export function CorpProfile({ profileID }: CorpProfileProps) {
    return (
        <>
            Corp #{profileID}
        </>
    )
}