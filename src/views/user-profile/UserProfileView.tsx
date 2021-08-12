import { UserCurrentBadgesComposer, UserCurrentBadgesEvent, UserProfileEvent, UserProfileParser, UserRelationshipsComposer, UserRelationshipsEvent, UserRelationshipsParser } from '@nitrots/nitro-renderer';
import { FC, useCallback, useState } from 'react';
import { CreateMessageHook, SendMessageHook } from '../../hooks';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../layout';
import { LocalizeText } from '../../utils';
import { BadgesContainerView } from './views/badges-container/BadgesContainerView';
import { FriendsContainerView } from './views/friends-container/FriendsContainerView';
import { UserContainerView } from './views/user-container/UserContainerView';

export const UserProfileView: FC = props =>
{
    const [userProfile, setUserProfile] = useState<UserProfileParser>(null);
    const [userBadges, setUserBadges] = useState<string[]>([]);
    const [userRelationships, setUserRelationships] = useState<UserRelationshipsParser>(null);

    const OnClose = useCallback(() =>
    {
        setUserProfile(null);
        setUserBadges([]);
        setUserRelationships(null);
    }, []);
    
    const OnUserCurrentBadgesEvent = useCallback((event: UserCurrentBadgesEvent) =>
    {
        const parser = event.getParser();

        if (userProfile && parser.userId === userProfile.id)
            setUserBadges(parser.badges);
    }, [userProfile, setUserBadges]);

    CreateMessageHook(UserCurrentBadgesEvent, OnUserCurrentBadgesEvent);

    const OnUserRelationshipsEvent = useCallback((event: UserRelationshipsEvent) =>
    {
        const parser = event.getParser();

        if (userProfile && parser.id === userProfile.id)
            setUserRelationships(parser);
    }, [userProfile, setUserRelationships]);

    CreateMessageHook(UserRelationshipsEvent, OnUserRelationshipsEvent);

    const OnUserProfileEvent = useCallback((event: UserProfileEvent) =>
    {
        const parser = event.getParser();

        if(userProfile && userProfile.id === parser.id)
            OnClose();
        
        setUserProfile(parser);
        SendMessageHook(new UserCurrentBadgesComposer(parser.id));
        SendMessageHook(new UserRelationshipsComposer(parser.id));
    }, [OnClose, userProfile]);

    CreateMessageHook(UserProfileEvent, OnUserProfileEvent);

    if (!userProfile) return null;

    return (
        <div className="user-profile">
            <NitroCardView>
                <NitroCardHeaderView headerText={LocalizeText('extendedprofile.caption')} onCloseClick={OnClose} />
                <NitroCardContentView>
                    <div className="row">
                        <div className="col-sm-7 user-container">
                            <UserContainerView id={userProfile.id} username={userProfile.username} motto={userProfile.motto} figure={userProfile.figure} secondsSinceLastLogin={userProfile.lastVisit} creation={userProfile.registration} achievementScore={userProfile.achievementPoints} isFriend={userProfile.isMyFriend} isOnline={userProfile.isOnline} requestSent={userProfile.requestSent} />
                            <BadgesContainerView badges={userBadges} />
                        </div>
                        <div className="col-sm-5">
                            {
                                userRelationships && <FriendsContainerView relationships={new Map([['heart', userRelationships.hearts], ['smile', userRelationships.smiles], ['bobba', userRelationships.bobbas]])} friendsCount={userProfile.friendsCount} />
                            }
                        </div>
                    </div>
                    <div className="row rooms-button-container align-items-center">
                        <div className="col-sm-12 d-flex align-content-center w-100">
                            <i className="icon icon-rooms" /><span className="rooms-button">{LocalizeText('extendedprofile.rooms')}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            groups list goes here
                        </div>
                        <div className="col-sm-8">
                            group info goes here
                        </div>
                    </div>
                </NitroCardContentView>
            </NitroCardView>
        </div>
    )
}
