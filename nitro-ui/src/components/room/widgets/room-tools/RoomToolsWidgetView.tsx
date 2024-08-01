import { CreateLinkEvent, GetSessionDataManager } from '../../../../api';
import { Column, Flex } from '../../../../common';
import { FaBox, FaCamera, FaCog, FaShieldAlt, FaStore, FaTaxi } from 'react-icons/fa';

export function RoomToolsWidgetView() {
    const isMod = GetSessionDataManager().isModerator;
    const handleToolClick = (action: string, value?: string) => {
        switch (action) {
            case 'settings':
                CreateLinkEvent('navigator/toggle-room-info');
                return;
            case 'camera':
                CreateLinkEvent('camera/toggle');
                return;
        }
    }
    return (
        <Flex className="nitro-room-tools-container" gap={2}>
            <Column center className="nitro-room-tools p-2">
                <FaTaxi size={20} style={{ cursor: 'pointer' }} onClick={() => CreateLinkEvent('navigator/toggle')} />
                <FaStore size={20} style={{ cursor: 'pointer' }} onClick={() => CreateLinkEvent('catalog/toggle')} />
                <FaBox size={20} style={{ cursor: 'pointer' }} onClick={() => CreateLinkEvent('inventory/toggle')} />
                <div style={{ height: 2, width: '100%', background: 'white' }} />
                <FaCog size={20} style={{ cursor: 'pointer' }} onClick={() => handleToolClick('settings')} />
                <FaCamera size={20} style={{ cursor: 'pointer' }} onClick={() => handleToolClick('camera')} />
                {isMod && <FaShieldAlt size={20} style={{ cursor: 'pointer' }} onClick={() => CreateLinkEvent('mod-tools/toggle')} />}
            </Column>
        </Flex>
    );
}