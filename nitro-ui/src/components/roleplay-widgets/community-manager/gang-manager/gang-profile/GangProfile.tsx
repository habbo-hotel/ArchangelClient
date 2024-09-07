interface GangProfileProps {
    profileID: number;
}

export function GangProfile({ profileID }: GangProfileProps) {
    return (
        <>
            Gang #{profileID}
        </>
    )
}