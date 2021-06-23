import { UserInfoEvent } from 'nitro-renderer/src/nitro/communication/messages/incoming/user/data/UserInfoEvent';
import { UserInfoDataParser } from 'nitro-renderer/src/nitro/communication/messages/parser/user/data/UserInfoDataParser';
import { FC, useCallback, useState } from 'react';
import { AvatarEditorEvent, CatalogEvent, FriendListEvent, InventoryEvent, NavigatorEvent, RoomWidgetCameraEvent } from '../../events';
import { dispatchUiEvent } from '../../hooks/events/ui/ui-event';
import { CreateMessageHook } from '../../hooks/messages/message-event';
import { TransitionAnimation } from '../../layout/transitions/TransitionAnimation';
import { TransitionAnimationTypes } from '../../layout/transitions/TransitionAnimation.types';
import { AvatarImageView } from '../shared/avatar-image/AvatarImageView';
import { ToolbarMeView } from './me/ToolbarMeView';
import { ToolbarViewItems, ToolbarViewProps } from './ToolbarView.types';

export const ToolbarView: FC<ToolbarViewProps> = props =>
{
    const { isInRoom } = props;

    const [ userInfo, setUserInfo ] = useState<UserInfoDataParser>(null);
    const [ isMeExpanded, setMeExpanded ] = useState(false);

    const unseenInventoryCount = 0;
    const unseenFriendListCount = 0;
    const unseenAchievementsCount = 0;

    const onUserInfoEvent = useCallback((event: UserInfoEvent) =>
    {
        const parser = event.getParser();

        setUserInfo(parser.userInfo);
    }, []);

    const handleToolbarItemClick = useCallback((item: string) =>
    {
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
            case ToolbarViewItems.CAMERA_ITEM:
                dispatchUiEvent(new RoomWidgetCameraEvent(RoomWidgetCameraEvent.TOGGLE_CAMERA));
                return;
            case ToolbarViewItems.CLOTHING_ITEM:
                dispatchUiEvent(new AvatarEditorEvent(AvatarEditorEvent.TOGGLE_EDITOR));
                setMeExpanded(false);
                return;
        }
    }, []);

    CreateMessageHook(UserInfoEvent, onUserInfoEvent);

    return (
        <div className="nitro-toolbar-container">
            <TransitionAnimation type={ TransitionAnimationTypes.FADE_IN } inProp={ isMeExpanded } timeout={ 300 }>
                <ToolbarMeView setMeExpanded={ setMeExpanded } handleToolbarItemClick={ handleToolbarItemClick } />
            </TransitionAnimation>
            <div className="d-flex justify-content-between nitro-toolbar py-1 px-3">
                <div className="d-flex toolbar-left-side">
                    <div className="navigation-items navigation-avatar pe-1 me-2">
                        <div className="navigation-item">
                            <div className={ 'toolbar-avatar ' + (isMeExpanded ? 'active ' : '') } onClick={ event => setMeExpanded(!isMeExpanded) }>
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
                        <div className="navigation-item" onClick={ event => handleToolbarItemClick(ToolbarViewItems.NAVIGATOR_ITEM) }>
                            <i className="icon icon-rooms"></i>
                        </div>
                        <div className="navigation-item" onClick={ event => handleToolbarItemClick(ToolbarViewItems.CATALOG_ITEM) }>
                            <i className="icon icon-catalog"></i>
                        </div>
                        <div className="navigation-item" onClick={ event => handleToolbarItemClick(ToolbarViewItems.INVENTORY_ITEM) }>
                            <i className="icon icon-inventory"></i>
                            { (unseenInventoryCount > 0) && (
                                <div className="position-absolute bg-danger px-1 py-0 rounded shadow count">{ unseenInventoryCount }</div>) }
                        </div>
                        <div className="navigation-item" onClick={ event => handleToolbarItemClick(ToolbarViewItems.FRIEND_LIST_ITEM) }>
                            <i className="icon icon-friendall"></i>
                            { (unseenFriendListCount > 0) && (
                                <div className="position-absolute bg-danger px-1 py-0 rounded shadow count">{ unseenFriendListCount }</div>) }
                        </div>
                        { isInRoom && (
                            <div className="navigation-item" onClick={ event => handleToolbarItemClick(ToolbarViewItems.CAMERA_ITEM) }>
                            <i className="icon icon-camera"></i>
                        </div>) }
                    </div>
                    <div id="toolbar-chat-input-container" className="d-flex align-items-center" />
                </div>
                <div className="d-flex toolbar-right-side">
                    <div id="toolbar-friend-bar-container" />
                </div>
            </div>
        </div>
    );
}
