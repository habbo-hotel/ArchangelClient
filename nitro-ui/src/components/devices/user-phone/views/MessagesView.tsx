import { FaCaretLeft, FaComment, FaTimes } from "react-icons/fa";
import { Base, Column, Flex, Grid, LayoutAvatarImageView, LayoutBadgeImageView, LayoutGridItem, LayoutItemCountView, Text } from "../../../../common";
import { GetSessionDataManager, GetUserProfile, LocalizeText } from "../../../../api";
import { Button, ButtonGroup } from "react-bootstrap";
import { FriendsMessengerThreadView } from "../../../friends/views/messenger/messenger-thread/FriendsMessengerThreadView";
import { useMessenger } from "../../../../hooks";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface MessagesViewProps {
    goBack(): void;
}

export function MessagesView({ goBack }: MessagesViewProps) {
    const messagesBox = useRef<HTMLDivElement>();
    const [messageText, setMessageText] = useState('');
    const { visibleThreads = [], activeThread = null, getMessageThread = null, sendMessage = null, setActiveThreadId = null, closeThread = null } = useMessenger();

    useEffect(() => {
        if (!activeThread) return;

        messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }, [activeThread]);

    function openProfile() {
        if (activeThread || activeThread?.participant) {
            return;
        }
        GetUserProfile(activeThread.participant.id)
    }

    function send() {
        if (!activeThread || !messageText.length) return;
        sendMessage(activeThread, GetSessionDataManager().userId, messageText);
        setMessageText('');
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key !== 'Enter') return;
        send();
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
                        Messages
                    </Text>
                </Flex>
            </Flex >
            <Grid fullHeight={true} fullWidth={true} gap={4} style={{ padding: 8 }}>
                <Column size={4} overflow="hidden" fullWidth={true} fullHeight={true}>
                    <Text bold>{LocalizeText('toolbar.icon.label.messenger')}</Text>
                    <Column fit overflow="auto" fullWidth={true} fullHeight={true}>
                        <Column>
                            {visibleThreads && (visibleThreads.length > 0) && visibleThreads.map(thread => {
                                return (
                                    <LayoutGridItem key={thread.threadId} itemActive={(activeThread === thread)} onClick={event => setActiveThreadId(thread.threadId)}>
                                        {thread.unread &&
                                            <LayoutItemCountView count={thread.unreadCount} />}
                                        <Flex fullWidth alignItems="center" gap={1}>
                                            <Flex alignItems="center" className="friend-head px-1">
                                                {(thread.participant.id > 0) &&
                                                    <LayoutAvatarImageView figure={thread.participant.figure} headOnly={true} direction={3} />}
                                                {(thread.participant.id <= 0) &&
                                                    <LayoutBadgeImageView isGroup={true} badgeCode={thread.participant.figure} />}
                                            </Flex>
                                            <Text truncate grow>{thread.participant.name}</Text>
                                        </Flex>
                                    </LayoutGridItem>
                                );
                            })}
                        </Column>
                    </Column>
                </Column>
                <Column size={8} overflow="hidden" fullWidth={true} fullHeight={true}>
                    {activeThread &&
                        <>
                            <Text bold center>{LocalizeText('messenger.window.separator', ['FRIEND_NAME'], [activeThread.participant.name])}</Text>
                            <Flex alignItems="center" justifyContent="between" gap={1}>
                                <Flex gap={1}>
                                    <ButtonGroup>
                                        <Button onClick={openProfile}>
                                            <Base className="nitro-friends-spritesheet icon-profile-sm" />
                                        </Button>
                                    </ButtonGroup>
                                </Flex>
                                <Button onClick={event => closeThread(activeThread.threadId)}>
                                    <FaTimes className="fa-icon" />
                                </Button>
                            </Flex>
                            <Column fit className="bg-muted p-2 rounded chat-messages">
                                <Column innerRef={messagesBox} overflow="auto">
                                    <FriendsMessengerThreadView thread={activeThread} />
                                </Column>
                            </Column>
                            <Flex gap={1}>
                                <input type="text" className="form-control form-control-sm" maxLength={255} placeholder={LocalizeText('messenger.window.input.default', ['FRIEND_NAME'], [activeThread.participant.name])} value={messageText} onChange={event => setMessageText(event.target.value)} onKeyDown={onKeyDown} />
                                <Button variant="success" onClick={send}>
                                    {LocalizeText('widgets.chatinput.say')}
                                </Button>
                            </Flex>
                        </>}
                </Column>
            </Grid>
        </>
    )
}