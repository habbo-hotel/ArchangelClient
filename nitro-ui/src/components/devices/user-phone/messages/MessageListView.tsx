import { FaCaretLeft, FaComment } from "react-icons/fa";
import { Column, Flex, Grid, Text } from "../../../../common";
import { useFriends } from "../../../../hooks";
import { MessageThreadPreview } from "./MessageThreadPreview";

interface MessageListViewProps {
    goBack(): void;
}

export function MessageListView({ goBack }: MessageListViewProps) {
    const { onlineFriends, offlineFriends } = useFriends();
    const friends = [...onlineFriends, ...offlineFriends]

    return (
        <>
            <Flex center={true} justifyContent="between">
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaComment style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Messages
                    </Text>
                </Flex>
            </Flex >
            <Grid>
                {
                    friends.map(friend => (
                        <Column size={12} center className="bg-muted" key={`msg_preview_${friend.id}`} style={{ height: 80, borderRadius: 4, cursor: 'pointer' }}>
                            <MessageThreadPreview friend={friend} />
                        </Column>
                    ))
                }
            </Grid>
        </>
    )
}