import { FollowFriendMessageComposer, ILinkEventTracker } from '@nitro-rp/renderer';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AddEventLinkTracker, GetSessionDataManager, GetUserProfile, LocalizeText, RemoveLinkEventTracker, ReportType, SendMessageComposer } from '../../../../api';
import { Base, Button, ButtonGroup, Column, Flex, Grid, LayoutAvatarImageView, LayoutBadgeImageView, LayoutGridItem, LayoutItemCountView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useHelp, useMessenger } from '../../../../hooks';
import { FriendsMessengerThreadView } from './messenger-thread/FriendsMessengerThreadView';

export const FriendsMessengerView: FC<{}> = props => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastThreadId, setLastThreadId] = useState(-1);
    const [messageText, setMessageText] = useState('');
    const { visibleThreads = [], activeThread = null, getMessageThread = null, sendMessage = null, setActiveThreadId = null, closeThread = null } = useMessenger();
    const { report = null } = useHelp();
    const messagesBox = useRef<HTMLDivElement>();

    const send = () => {
        if (!activeThread || !messageText.length) return;

        sendMessage(activeThread, GetSessionDataManager().userId, messageText);

        setMessageText('');
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        send();
    }

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length === 2) {
                    if (parts[1] === 'open') {
                        setIsVisible(true);

                        return;
                    }

                    if (parts[1] === 'toggle') {
                        setIsVisible(prevValue => !prevValue);

                        return;
                    }

                    const thread = getMessageThread(parseInt(parts[1]));

                    if (!thread) return;

                    setActiveThreadId(thread.threadId);
                    setIsVisible(true);
                }
            },
            eventUrlPrefix: 'friends-messenger/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [getMessageThread, setActiveThreadId]);

    useEffect(() => {
        if (!isVisible || !activeThread) return;

        messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }, [isVisible, activeThread]);

    useEffect(() => {
        if (isVisible && !activeThread) {
            if (lastThreadId > 0) {
                setActiveThreadId(lastThreadId);
            }
            else {
                if (visibleThreads.length > 0) setActiveThreadId(visibleThreads[0].threadId);
            }

            return;
        }

        if (!isVisible && activeThread) {
            setLastThreadId(activeThread.threadId);
            setActiveThreadId(-1);
        }
    }, [isVisible, activeThread, lastThreadId, visibleThreads, setActiveThreadId]);

    if (!isVisible) return null;

    return (
        <NitroCardView className="nitro-friends-messenger" uniqueKey="nitro-friends-messenger" theme="primary-slim">
            <NitroCardHeaderView headerText={LocalizeText('messenger.window.title', ['OPEN_CHAT_COUNT'], [visibleThreads.length.toString()])} onCloseClick={event => setIsVisible(false)} />
            <NitroCardContentView>

            </NitroCardContentView>
        </NitroCardView>
    );
}
