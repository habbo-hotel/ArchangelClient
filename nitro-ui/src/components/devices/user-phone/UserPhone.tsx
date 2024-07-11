import './UserPhone.css';
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Column, DraggableWindow, Flex, Grid, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { PhoneOpenEvent } from "@nitro-rp/renderer"
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { FaComment, FaDollarSign, FaShieldAlt, FaTimesCircle, FaUsers } from "react-icons/fa";
import { DeviceClose } from "../../../api/roleplay/device/DeviceClose";
import { EmergencyView } from './views/EmergencyView';
import { ContactListView } from './contacts/ContactListView';
import { MessageView } from './messages/MessageView';
import { BankAccountListView } from './bank/BankAccountListView';

interface PhoneApp {
    key: string;
    label: ReactNode;
    color: ButtonVariant;
    children: ReactNode;
};

export function UserPhone() {
    const [isVisible, setIsVisible] = useState(false)
    const [itemID, setItemID] = useState<number>();
    const [activeApp, setActiveApp] = useState<PhoneApp>();

    function goBack() {
        setActiveApp(undefined);
    }

    const phoneApps: Array<PhoneApp> = useMemo(() => [
        {
            key: 'contacts',
            label: (
                <Flex fullWidth center>
                    <FaUsers style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'primary',
            children: <ContactListView goBack={goBack} onMessage={contact => alert(`hey ${contact.name}`)} />,
        },
        {
            key: 'messages',
            label: (
                <Flex fullWidth center>
                    <FaComment style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'success',
            children: <MessageView goBack={goBack} />,
        },
        {
            key: 'bank',
            label: (
                <Flex fullWidth center>
                    <FaDollarSign style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'dark',
            children: <BankAccountListView goBack={goBack} />,
        },
        {
            key: 'emergency',
            label: (
                <Flex fullWidth center>
                    <FaShieldAlt style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'danger',
            children: <EmergencyView goBack={goBack} />,
        },
    ], []);

    useMessageEvent<PhoneOpenEvent>(PhoneOpenEvent, event => {
        setIsVisible(true);
        setItemID(event.getParser().itemID);
    });

    useEffect(() => {
        if (isVisible) {
            return;
        }
        DeviceClose(itemID)
    }, [isVisible])

    if (!isVisible) {
        return null;
    }

    return (
        <DraggableWindow handleSelector=".drag-handler">
            <Column gap={0} alignItems="center" className={`nitro-layout-trophy`}>
                <Flex center fullWidth position="relative" className="trophy-header drag-handler">
                    <div className="iphone-x drag-handler">
                        <div className="side">
                            <div className="screen">
                                <video src="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4" autoPlay loop />
                                <div style={{ position: 'absolute', top: 25, left: 0, width: '100%', height: 550, padding: 8 }}>
                                    {!activeApp && (
                                        <Grid fullWidth={true} fullHeight={false} overflow="hidden" gap={2}>
                                            <Flex center={true} justifyContent="between" fullWidth={true}>
                                                <Flex center>
                                                    <Text color="white" bold fontSize={2} onClick={() => setIsVisible(false)} style={{ cursor: 'pointer', marginRight: 8 }}>
                                                        <FaTimesCircle />
                                                    </Text>
                                                    <Text fontSize={2}>
                                                        FlexPhone
                                                    </Text>
                                                </Flex>
                                            </Flex >
                                            {phoneApps.map(app => (
                                                <Column key={`app_${app.key}`} fullHeight={false} fullWidth={false} size={12} style={{ flex: 0 }}>
                                                    <Button variant={app.color} onClick={() => setActiveApp(app)}>
                                                        {app.label}
                                                    </Button>
                                                </Column>
                                            ))}
                                        </Grid>
                                    )}
                                    {activeApp && (
                                        <Column fullWidth={true} fullHeight={true}>
                                            {activeApp.children}
                                        </Column>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="line" />
                        <div className="header">
                            <div className="sensor-1" />
                            <div className="sensor-2" />
                            <div className="sensor-3" />
                        </div>
                        <div className="volume-button" />
                        <div className="power-button" />
                    </div>
                </Flex>
            </Column>
        </DraggableWindow >
    )
}