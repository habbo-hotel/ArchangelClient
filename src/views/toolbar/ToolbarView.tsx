import classNames from 'classnames';
import { UserInfoEvent } from 'nitro-renderer/src/nitro/communication/messages/incoming/user/data/UserInfoEvent';
import { UserInfoDataParser } from 'nitro-renderer/src/nitro/communication/messages/parser/user/data/UserInfoDataParser';
import { MouseEvent, useCallback, useState } from 'react';
import { CatalogEvent, FriendListEvent, InventoryEvent, NavigatorEvent } from '../../events';
import { dispatchUiEvent } from '../../hooks/events/ui/ui-event';
import { CreateMessageHook } from '../../hooks/messages/message-event';
import { TransitionAnimation } from '../../transitions/TransitionAnimation';
import { TransitionAnimationTypes } from '../../transitions/TransitionAnimation.types';
import { AvatarImageView } from '../avatar-image/AvatarImageView';
import { ToolbarMeView } from './me/ToolbarMeView';
import { ToolbarViewItems, ToolbarViewProps } from './ToolbarView.types';

export function ToolbarView(props: ToolbarViewProps): JSX.Element
{
    const { isInRoom } = props;

    const [ userInfo, setUserInfo ]                 = useState<UserInfoDataParser>(null);
    const [ expandMeToolbar, setExpandMeToolbar ]   = useState(false);

    const unseenInventoryCount = 0;
    const unseenFriendListCount = 0;
    const unseenAchievementsCount = 0;

    const onUserInfoEvent = useCallback((event: UserInfoEvent) =>
    {
        const parser = event.getParser();

        setUserInfo(parser.userInfo);
    }, []);

    function handleToolbarItemClick(event: MouseEvent, item: string): void
    {
        event.preventDefault();

        switch(item)
        {
            case ToolbarViewItems.NAVIGATOR_ITEM:
                dispatchUiEvent(new NavigatorEvent(NavigatorEvent.TOGGLE_NAVIGATOR));
                return;
            case ToolbarViewItems.INVENTORY_ITEM:
                dispatchUiEvent(new InventoryEvent(InventoryEvent.TOGGLE_INVENTORY));
                return;
            case ToolbarViewItems.CATALOG_ITEM:
                dispatchUiEvent(new CatalogEvent(CatalogEvent.TOGGLE_CATALOG));
                return;
            case ToolbarViewItems.FRIEND_LIST_ITEM:
                dispatchUiEvent(new CatalogEvent(FriendListEvent.TOGGLE_FRIEND_LIST));
                return;
        }
    }

    function toggleMeToolbar(): void
    {
        setExpandMeToolbar((value) => !value);
    }

    CreateMessageHook(UserInfoEvent, onUserInfoEvent);

    return (
        <>
            { <TransitionAnimation className="" type={ TransitionAnimationTypes.FADE_IN } inProp={ expandMeToolbar } timeout={ 300 }>
                <ToolbarMeView />
            </TransitionAnimation> }
            <div className="d-flex nitro-toolbar py-1 px-3">
                <div className="navigation-items navigation-avatar pe-1 me-2">
                    <div className="navigation-item">
                        <div className={"toolbar-avatar" + classNames({ ' active': expandMeToolbar })} onClick={ toggleMeToolbar }>
                            { userInfo && <AvatarImageView figure={ userInfo.figure } direction={ 2 } /> }
                        </div>
                    </div>
                    { (unseenAchievementsCount > 0) && (
                        <div className="position-absolute bg-danger px-1 py-0 rounded shadow count">{ unseenAchievementsCount }</div>) }
                </div>
                <div className="navigation-items">
                    {/* { isInRoom && (
                        <div className="navigation-item">
                            <i className="icon icon-hotelview icon-nitro-light filter-none"></i>
                        </div>) } */}
                    { !isInRoom && (
                        <div className="navigation-item">
                            <i className="icon icon-house"></i>
                        </div>) }
                    <div className="navigation-item" onClick={ event => handleToolbarItemClick(event, ToolbarViewItems.NAVIGATOR_ITEM) }>
                        <i className="icon icon-rooms"></i>
                    </div>
                    <div className="navigation-item" onClick={ event => handleToolbarItemClick(event, ToolbarViewItems.CATALOG_ITEM) }>
                        <i className="icon icon-catalog"></i>
                    </div>
                    <div className="navigation-item" onClick={ event => handleToolbarItemClick(event, ToolbarViewItems.INVENTORY_ITEM) }>
                        <i className="icon icon-inventory"></i>
                        { (unseenInventoryCount > 0) && (
                            <div className="position-absolute bg-danger px-1 py-0 rounded shadow count">{ unseenInventoryCount }</div>) }
                    </div>
                    <div className="navigation-item" onClick={ event => handleToolbarItemClick(event, ToolbarViewItems.FRIEND_LIST_ITEM) }>
                        <i className="icon icon-friendall"></i>
                        { (unseenFriendListCount > 0) && (
                            <div className="position-absolute bg-danger px-1 py-0 rounded shadow count">{ unseenFriendListCount }</div>) }
                    </div>
                </div>
            </div>
        </>
    );
}
