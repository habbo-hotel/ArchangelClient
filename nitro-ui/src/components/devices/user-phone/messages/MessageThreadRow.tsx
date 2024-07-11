import { useMemo } from 'react';
import { Base, Flex, LayoutAvatarImageView } from '../../../../common';
import { GetGroupChatData, GetSessionDataManager, MessengerGroupType, MessengerThread, MessengerThreadChatGroup } from '../../../../api';

export function MessageThreadRow({ thread, group }: { thread: MessengerThread, group: MessengerThreadChatGroup }) {
    const groupChatData = useMemo(() => ((group.type === MessengerGroupType.GROUP_CHAT) && GetGroupChatData(group.chats[0].extraData)), [group]);

    const isOwnChat = useMemo(() => {
        if (!thread || !group) return false;

        if ((group.type === MessengerGroupType.PRIVATE_CHAT) && (group.userId === GetSessionDataManager().userId)) return true;

        if (groupChatData && group.chats.length && (groupChatData.userId === GetSessionDataManager().userId)) return true;

        return false;
    }, [thread, group, groupChatData]);

    if (!thread || !group) return null;

    if (!group.userId) {
        return null;
    }

    return (
        <Flex fullWidth justifyContent={isOwnChat ? 'end' : 'start'} gap={2}>
            <Base shrink className="message-avatar">
                {((group.type === MessengerGroupType.PRIVATE_CHAT) && !isOwnChat) &&
                    <LayoutAvatarImageView figure={thread.participant.figure} direction={2} style={{ height: 80 }} />}
                {(groupChatData && !isOwnChat) &&
                    <LayoutAvatarImageView figure={groupChatData.figure} direction={2} style={{ height: 80 }} />}
            </Base>
            <Base className={'bg-light text-black border-radius mb-2 rounded py-1 px-2 messages-group-' + (isOwnChat ? 'right' : 'left')}>
                <Base className="fw-bold">
                    {isOwnChat && GetSessionDataManager().userName}
                    {!isOwnChat && (groupChatData ? groupChatData.username : thread.participant.name)}
                </Base>
                {group.chats.map((chat, index) => <Base key={index} className="text-break">{chat.message}</Base>)}
            </Base>
            {isOwnChat &&
                <Base shrink className="message-avatar">
                    <LayoutAvatarImageView figure={GetSessionDataManager().figure} direction={4} style={{ height: 80 }} />
                </Base>}
        </Flex>
    );
}