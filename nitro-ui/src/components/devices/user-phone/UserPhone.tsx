import './UserPhone.css';
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Column, DraggableWindow, Flex, Grid, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { DeviceOpenEvent, InteractionType } from "@nitro-rp/renderer"
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { FaComment, FaDollarSign, FaRegTimesCircle, FaShieldAlt, FaTimesCircle, FaUsers, FaWalking, FaWatchmanMonitoring } from "react-icons/fa";
import { DeviceClose } from "../../../api/roleplay/device/DeviceClose";
import { ContactListView } from './contacts/ContactListView';
import { MessageView } from './messages/MessageView';
import { BankAccountListView } from './bank/BankAccountListView';
import { CallPoliceView } from './emergency/CallPoliceView';

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
            children: <CallPoliceView goBack={goBack} />,
        },
    ], []);

    useMessageEvent<DeviceOpenEvent>(DeviceOpenEvent, event => {
        if (event.getParser().interactionType !== InteractionType.PHONE) {
            return;
        }
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
            <Column gap={0} alignItems="center">
                <Flex center fullWidth position="relative" className="drag-handler">
                    <div className="iphone-x">
                        <div className="side">
                            <div className="screen">
                                <video src="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4" autoPlay loop />
                                <div style={{ position: 'absolute', top: 10, left: 0, height: 'calc(100% - 60px)', width: '100%', padding: 8 }}>
                                    <div style={{ height: '100%' }}>
                                        {!activeApp && (
                                            <Grid fullWidth={true} fullHeight={false} overflow="hidden" gap={2}>
                                                <Flex center={true} justifyContent="between" fullWidth={true}>
                                                    <Flex center>

                                                        <Text fontSize={2}>

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
                                    {!activeApp && (
                                        <Flex center>
                                            <Text bold fontSize={1} onClick={() => setIsVisible(false)} style={{ cursor: 'pointer', marginRight: 8 }}>
                                                <FaRegTimesCircle style={{ color: 'gray' }} />
                                            </Text>
                                        </Flex>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Flex>
            </Column>
        </DraggableWindow >
    )
}