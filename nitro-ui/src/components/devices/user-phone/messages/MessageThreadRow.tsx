import './MessageThreadRow.css';
import { useMemo } from 'react';
import { Base, Flex, LayoutAvatarImageView } from '../../../../common';
import { GetGroupChatData, GetSessionDataManager, MessengerGroupType, MessengerThread, MessengerThreadChatGroup } from '../../../../api';
import { useSessionInfo } from '../../../../hooks';

export function MessageThreadRow({ thread, group }: { thread: MessengerThread, group: MessengerThreadChatGroup }) {
    const groupChatData = useMemo(() => ((group.type === MessengerGroupType.GROUP_CHAT) && GetGroupChatData(group.chats[0].extraData)), [group]);
    const { userInfo } = useSessionInfo();

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
        <div className="imessage">
            <div className={`message-wrapper ${isOwnChat ? 'from-me' : 'from-them'}`}>
                <LayoutAvatarImageView figure={isOwnChat ? userInfo?.figure : thread.participant.figure} direction={2} style={{ height: 80 }} />
                <p className={`text-break ${isOwnChat ? 'from-me' : 'from-them'}`}>
                    {group.chats.map(_ => <>{_.message}<br /></>)}
                </p>

            </div>
        </div>
    );
}
