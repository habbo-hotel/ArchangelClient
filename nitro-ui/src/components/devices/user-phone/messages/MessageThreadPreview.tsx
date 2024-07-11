import { useMemo } from "react";
import { MessengerFriend, MessengerThreadChat } from "../../../../api";
import { Column, Flex, Grid, LayoutAvatarImageView, Text } from "../../../../common";
import { useMessenger, useSessionInfo } from "../../../../hooks";

interface MessageThreadPreviewProps {
    friend: MessengerFriend;
}

export function MessageThreadPreview({ friend }: MessageThreadPreviewProps) {
    const { userInfo } = useSessionInfo();
    const { getMessageThread, setActiveThreadId } = useMessenger();
    const thread = getMessageThread(friend.id);

    const lastChat: MessengerThreadChat = useMemo(() => {
        if (!thread?.groups) {
            return;
        }
        for (const group of thread.groups.reverse()) {
            if (group.userId != null) {
                return group.chats[group.chats.length - 1]
            }
        }
    }, [thread?.groups?.length]);
    return (
        <Grid center onClick={() => setActiveThreadId(thread?.threadId)}>
            <Column center size={4} style={{ marginTop: -20 }}>
                <LayoutAvatarImageView className="avatar" figure={friend.figure} direction={2} style={{ height: 80 }} />
                <Text bold fontSize={6} style={{ marginTop: -10 }}>{friend.name}</Text>
            </Column>
            <Column center size={8} style={{ cursor: 'pointer' }}>
                <Flex column className="bg-dark" style={{ borderRadius: 4, padding: 4, margin: 4 }}>
                    <Text fontSize={5} variant="white">
                        {
                            lastChat?.message?.substring(0, 45)
                        }
                    </Text>
                    <Text fontSize={6} variant="primary">
                        - {lastChat?.senderId === friend.id ? friend.name : userInfo?.username}
                    </Text>
                </Flex>
            </Column>
        </Grid>
    )
}