import { useEffect } from 'react';
import { GetCommunication } from '../../api';
import { Base, Flex } from '../../common';
import { AchievementsView } from '../achievements/AchievementsView';
import { AvatarEditorView } from '../avatar-editor/AvatarEditorView';
import { CameraWidgetView } from '../camera/CameraWidgetView';
import { CampaignView } from '../campaign/CampaignView';
import { CatalogView } from '../catalog/CatalogView';
import { ChatHistoryView } from '../chat-history/ChatHistoryView';
import { FloorplanEditorView } from '../floorplan-editor/FloorplanEditorView';
import { GroupsView } from '../groups/GroupsView';
import { HcCenterView } from '../hc-center/HcCenterView';
import { HelpView } from '../help/HelpView';
import { ModToolsView } from '../mod-tools/ModToolsView';
import { NavigatorView } from '../navigator/NavigatorView';
import { NitropediaView } from '../nitropedia/NitropediaView';
import { RightSideView } from '../right-side/RightSideView';
import { RoomView } from '../room/RoomView';
import { UserProfileView } from '../user-profile/UserProfileView';
import { UserSettingsView } from '../user-settings/UserSettingsView';
import { WiredView } from '../wired/WiredView';
import { LeftSideView } from '../left-side/LeftSideView';
import { CorpTools } from '../corp-tools/CorpTools';
import { Billing } from '../billing/Billing';
import { InventoryView } from '../inventory/InventoryView';
import { Devices } from '../devices/Devices';
import { HotBarView } from '../hotbar/HotBarView';
import { RoleplayEffects } from '../roleplay-effects/RoleplayEffects';
import { MiddleView } from '../middle/MiddleView';

export function MainView() {

    useEffect(() => {
        GetCommunication().connection.onReady();
    }, []);

    return (
        <Base fit>
            <HotBarView />
            <Flex center className="nitro-chatbar">
                <Flex id="toolbar-chat-input-container" />
            </Flex>
            <ModToolsView />
            <RoomView />
            <ChatHistoryView />
            <WiredView />
            <AvatarEditorView />
            <AchievementsView />
            <NavigatorView />
            <InventoryView />
            <CatalogView />
            <LeftSideView />
            <MiddleView />
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
            <Devices />
            <RoleplayEffects />
        </Base>
    );
}
