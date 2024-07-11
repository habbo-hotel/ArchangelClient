import { FaCaretLeft, FaComment } from "react-icons/fa";
import { Button, Flex, Text } from "../../../../common";
import { useMessenger } from "../../../../hooks";
import { MessageThreadRow } from "./MessageThreadRow";
import { KeyboardEvent, useMemo, useState } from "react";
import { GetSessionDataManager, MessengerThreadChatGroup } from "../../../../api";

interface MessageThreadViewProps {
    goBack(): void;
}

export function MessageThreadView({ goBack }: MessageThreadViewProps) {
    const [message, setMessage] = useState('')
    const { activeThread, sendMessage } = useMessenger();

    const messageGroups: MessengerThreadChatGroup[] = useMemo(() => {
        return activeThread.groups;
    }, [activeThread.groups]);

    function onSendMessage() {
        if (!activeThread || !message.length) return;
        sendMessage(activeThread, GetSessionDataManager().userId, message);
        setMessage('');
    }

    function onPressEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key !== 'Enter') return;
        onSendMessage();
    }

    return (
        <>
            <Flex center={true} justifyContent="between">
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaComment style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        You + {activeThread.participant.name}
                    </Text>
                </Flex>
            </Flex >
            <Flex column style={{ overflowY: 'auto', height: 500 }}>
                {messageGroups.map((group, i) => (
                    <MessageThreadRow key={`thread_row_${i}`} thread={activeThread} group={group} />
                ))}
            </Flex>

            <Flex center={true}>
                <input type="text" className="form-control form-control-sm" maxLength={255} placeholder="What do you want to say?" value={message} onChange={event => setMessage(event.target.value)} onKeyDown={onPressEnter} />
                <Button variant="success" onClick={onSendMessage}>
                    Send
                </Button>
            </Flex>
        </>
    )
}
