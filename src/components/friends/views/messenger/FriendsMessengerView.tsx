import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FollowFriendMessageComposer, ILinkEventTracker } from '@nitrots/nitro-renderer';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AddEventLinkTracker, GetUserProfile, LocalizeText, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { Base, Button, ButtonGroup, Column, Flex, Grid, LayoutAvatarImageView, LayoutBadgeImageView, LayoutGridItem, LayoutItemCountView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { BatchUpdates, useMessenger } from '../../../../hooks';
import { FriendsMessengerThreadView } from './FriendsMessengerThreadView';

export const FriendsMessengerView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ lastThreadId, setLastThreadId ] = useState(-1);
    const [ messageText, setMessageText ] = useState('');
    const { visibleThreads = [], activeThread = null, getMessageThread = null, sendMessage = null, setActiveThread = null, closeThread = null } = useMessenger();
    const messagesBox = useRef<HTMLDivElement>();

    const followFriend = () => (activeThread && activeThread.participant && SendMessageComposer(new FollowFriendMessageComposer(activeThread.participant.id)));
    const openProfile = () => (activeThread && activeThread.participant && GetUserProfile(activeThread.participant.id));

    const send = () =>
    {
        if(!activeThread || !messageText.length) return;

        sendMessage(activeThread, messageText);

        setMessageText('');
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    {
        if(event.key !== 'Enter') return;

        send();
    }

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');

                if(parts.length === 2)
                {
                    if(parts[1] === 'open')
                    {
                        setIsVisible(true);

                        return;
                    }
                    else
                    {
                        const thread = getMessageThread(parseInt(parts[1]));

                        if(!thread) return;

                        BatchUpdates(() =>
                        {
                            setActiveThread(thread);
                            setIsVisible(true);
                        });
                    }
                }
            },
            eventUrlPrefix: 'friends-messenger/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [ getMessageThread, setActiveThread ]);

    // useEffect(() =>
    // {
    //     if(!isVisible || activeThread || !visibleThreads || !visibleThreads.length) return;

    //     setActiveThread(visibleThreads[0]);
    // }, [ isVisible, visibleThreads, activeThread, setActiveThread ]);

    useEffect(() =>
    {
        if(!isVisible || !activeThread) return;

        messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }, [ isVisible, activeThread ]);

    useEffect(() =>
    {
        if(!activeThread) return;

        return () =>
        {
            console.log('set last thread id', activeThread.threadId);
            setLastThreadId(activeThread.threadId);
        }
    }, [ activeThread ]);

    useEffect(() =>
    {
        return () =>
        {
            console.log('clear thread')
            setActiveThread(null);
        }
    }, [ setActiveThread ]);

    if(!isVisible) return null;

    return (
        <NitroCardView className="nitro-friends-messenger" uniqueKey="nitro-friends-messenger" theme="primary-slim">
            <NitroCardHeaderView headerText={ LocalizeText('messenger.window.title', [ 'OPEN_CHAT_COUNT' ], [ visibleThreads.length.toString() ]) } onCloseClick={ event => setIsVisible(false) } />
            <NitroCardContentView>
                <Grid overflow="hidden">
                    <Column size={ 4 }>
                        <Text bold>{ LocalizeText('toolbar.icon.label.messenger') }</Text>
                        <Column fullHeight overflow="auto">
                            { visibleThreads && (visibleThreads.length > 0) && visibleThreads.map(thread =>
                            {
                                return (
                                    <LayoutGridItem key={ thread.threadId } itemActive={ (activeThread === thread) } onClick={ event => setActiveThread(thread) }>
                                        { thread.unread &&
                                            <LayoutItemCountView count={ thread.unreadCount } /> }
                                        <Flex fullWidth alignItems="center" gap={ 1 }>
                                            <Flex alignItems="center" className="friend-head px-1">
                                                { (thread.participant.id > 0) &&
                                                    <LayoutAvatarImageView figure={ thread.participant.figure } headOnly={ true } direction={ 3 } /> }
                                                { (thread.participant.id <= 0) &&
                                                    <LayoutBadgeImageView isGroup={ true } badgeCode={ thread.participant.figure } /> }
                                            </Flex>
                                            <Text truncate grow>{ thread.participant.name }</Text>
                                        </Flex>
                                    </LayoutGridItem>
                                );
                            })}
                        </Column>
                    </Column>
                    <Column size={ 8 } overflow="hidden">
                        { activeThread &&
                            <>
                                <Text bold center>{ LocalizeText('messenger.window.separator', [ 'FRIEND_NAME' ], [ activeThread.participant.name ]) }</Text>
                                <Flex alignItems="center" justifyContent="between" gap={ 1 }>
                                    <Flex gap={ 1 }>
                                        <ButtonGroup>
                                            <Button onClick={ followFriend }>
                                                <Base className="nitro-friends-spritesheet icon-follow" />
                                            </Button>
                                            <Button onClick={ openProfile }>
                                                <Base className="nitro-friends-spritesheet icon-profile-sm" />
                                            </Button>
                                        </ButtonGroup>
                                        <Button variant="danger" onClick={ openProfile }>
                                            { LocalizeText('messenger.window.button.report') }
                                        </Button>
                                    </Flex>
                                    <Button onClick={ event => closeThread(activeThread.threadId) }>
                                        <FontAwesomeIcon icon="times" />
                                    </Button>
                                </Flex>
                                <Column fit className="bg-muted p-2 rounded chat-messages">
                                    <Column innerRef={ messagesBox } overflow="auto">
                                        <FriendsMessengerThreadView thread={ activeThread } />
                                    </Column>
                                </Column>
                                <Flex gap={ 1 }>
                                    <input type="text" className="form-control form-control-sm" maxLength={ 255 } placeholder={ LocalizeText('messenger.window.input.default', [ 'FRIEND_NAME' ], [ activeThread.participant.name ]) } value={ messageText } onChange={ event => setMessageText(event.target.value) } onKeyDown={ onKeyDown } />
                                    <Button variant="success" onClick={ send }>
                                        { LocalizeText('widgets.chatinput.say') }
                                    </Button>
                                </Flex>
                            </> }
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    );
}
