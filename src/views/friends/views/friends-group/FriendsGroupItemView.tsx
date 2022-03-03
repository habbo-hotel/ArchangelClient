import { FollowFriendMessageComposer, SetRelationshipStatusComposer } from '@nitrots/nitro-renderer';
import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { LocalizeText, OpenMessengerChat, SendMessageComposer } from '../../../../api';
import { Base, Flex, FlexProps, UserProfileIconView } from '../../../../common';
import { MessengerFriend } from '../../common/MessengerFriend';

interface FriendsGroupItemViewProps extends FlexProps
{
    friend: MessengerFriend;
    selected?: boolean;
    selectFriend: () => void;
}

export const FriendsGroupItemView: FC<FriendsGroupItemViewProps> = props =>
{
    const { friend = null, selected = false, selectFriend = null, children = null, ...rest } = props;

    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const followFriend = useCallback(() =>
    {
        if(!friend) return;
        
        SendMessageComposer(new FollowFriendMessageComposer(friend.id));
    }, [ friend ]);

    const openMessengerChat = useCallback((e) =>
    {
        e.stopPropagation();
        
        if(!friend) return;
        
        OpenMessengerChat(friend.id);
    }, [ friend ]);

    const getCurrentRelationshipName = useCallback(() =>
    {
        if(!friend) return 'none';

        switch(friend.relationshipStatus)
        {
            case MessengerFriend.RELATIONSHIP_HEART: return 'heart';
            case MessengerFriend.RELATIONSHIP_SMILE: return 'smile';
            case MessengerFriend.RELATIONSHIP_BOBBA: return 'bobba';
            default: return 'none';
        }
    }, [ friend ]);

    const initUpdateRelationship = useCallback((e) =>
    {
        e.stopPropagation();
        setIsExpanded(true);
    }, []);

    const updateRelationship = useCallback((e, type: number) =>
    {
        e.stopPropagation();
        
        if(type !== friend.relationshipStatus) SendMessageComposer(new SetRelationshipStatusComposer(friend.id, type));
        
        setIsExpanded(false);
    }, [ friend ]);

    if(!friend) return null;

    return (
        <Flex className={ 'px-2 py-1 align-items-center' + classNames({ ' bg-primary text-white': selected }) } gap={ 1 } { ...rest } onClick={ selectFriend }>
            <div  onClick={ (e) => e.stopPropagation() }>
                <UserProfileIconView userId={ friend.id } />
            </div>
            <div>{ friend.name }</div>
            <Flex className="ms-auto align-items-center" gap={ 1 }>
                { !isExpanded &&
                    <>
                        { friend.followingAllowed &&
                            <Base onClick={ followFriend } className="nitro-friends-spritesheet icon-follow cursor-pointer" title={ LocalizeText('friendlist.tip.follow') } /> }
                        { friend.online &&
                            <Base className="nitro-friends-spritesheet icon-chat cursor-pointer" onClick={ openMessengerChat } title={ LocalizeText('friendlist.tip.im') } /> }
                        <Base className={ `nitro-friends-spritesheet icon-${ getCurrentRelationshipName() } cursor-pointer` } onClick={ initUpdateRelationship } title={ LocalizeText('infostand.link.relationship') } />
                    </> }
                { isExpanded &&
                    <>
                        <Base className="nitro-friends-spritesheet icon-heart cursor-pointer" onClick={ (e) => updateRelationship(e, MessengerFriend.RELATIONSHIP_HEART) } />
                        <Base className="nitro-friends-spritesheet icon-smile cursor-pointer" onClick={ (e) => updateRelationship(e, MessengerFriend.RELATIONSHIP_SMILE) } />
                        <Base className="nitro-friends-spritesheet icon-bobba cursor-pointer" onClick={ (e) => updateRelationship(e, MessengerFriend.RELATIONSHIP_BOBBA) } />
                        <Base className="nitro-friends-spritesheet icon-none cursor-pointer" onClick={ (e) => updateRelationship(e, MessengerFriend.RELATIONSHIP_NONE) } />
                    </> }
            </Flex>
            { children }
        </Flex>
    );
}
