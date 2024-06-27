import { useEffect } from 'react';
import { GetCommunication } from '../../api';
import { Base } from '../../common';
import { AchievementsView } from '../achievements/AchievementsView';
import { AvatarEditorView } from '../avatar-editor/AvatarEditorView';
import { CameraWidgetView } from '../camera/CameraWidgetView';
import { CampaignView } from '../campaign/CampaignView';
import { CatalogView } from '../catalog/CatalogView';
import { ChatHistoryView } from '../chat-history/ChatHistoryView';
import { FloorplanEditorView } from '../floorplan-editor/FloorplanEditorView';
import { FriendsView } from '../friends/FriendsView';
import { GroupsView } from '../groups/GroupsView';
import { HcCenterView } from '../hc-center/HcCenterView';
import { HelpView } from '../help/HelpView';
import { ModToolsView } from '../mod-tools/ModToolsView';
import { NavigatorView } from '../navigator/NavigatorView';
import { NitropediaView } from '../nitropedia/NitropediaView';
import { RightSideView } from '../right-side/RightSideView';
import { RoomView } from '../room/RoomView';
import { ToolbarView } from '../toolbar/ToolbarView';
import { UserProfileView } from '../user-profile/UserProfileView';
import { UserSettingsView } from '../user-settings/UserSettingsView';
import { WiredView } from '../wired/WiredView';
import { LeftSideView } from '../left-side/LeftSideView';
import { CorpTools } from '../corp-tools/CorpTools';
import { Billing } from '../billing/Billing';
import { InventoryView } from '../inventory/InventoryView';
import { Bank } from '../bank/Bank';
import { Devices } from '../devices/Devices';

export function MainView() {

    useEffect(() => {
        GetCommunication().connection.onReady();
    }, []);

    return (
        <Base fit>
            <ToolbarView />
            <ModToolsView />
            <RoomView />
            <ChatHistoryView />
            <WiredView />
            <AvatarEditorView />
            <AchievementsView />
            <NavigatorView />
            <InventoryView />
            <CatalogView />
            <FriendsView />
            <LeftSideView />
            <RightSideView />
            <UserSettingsView />
            <UserProfileView />
            <GroupsView />
            <CameraWidgetView />
            <HelpView />
            <NitropediaView />
            <HcCenterView />
            <CampaignView />
            <FloorplanEditorView />
            <CorpTools />
            <Billing />
            <Bank />
            <Devices />
        </Base>
    );
}
