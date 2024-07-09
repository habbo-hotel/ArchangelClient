import './UserPhone.css';
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Column, DraggableWindow, Flex, Grid, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { PhoneOpenEvent } from "@nitro-rp/renderer"
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { FaComment, FaDollarSign, FaIdBadge, FaShieldAlt, FaTimesCircle, FaUsers } from "react-icons/fa";
import { DeviceClose } from "../../../api/roleplay/device/DeviceClose";

export function UserPhone() {
    const [isVisible, setIsVisible] = useState(false)
    const [itemID, setItemID] = useState<number>();

    const phoneApps: Array<{ key: string, label: ReactNode, color: ButtonVariant, onClick: () => void }> = useMemo(() => [
        {
            key: 'contacts',
            label: (
                <Flex fullWidth center>
                    <FaUsers style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'primary',
            onClick: () => alert('hay gurl'),
        },
        {
            key: 'messages',
            label: (
                <Flex fullWidth center>
                    <FaComment style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'success',
            onClick: () => alert('mhmmmm wyd'),
        },
        {
            key: 'bank',
            label: (
                <Flex fullWidth center>
                    <FaDollarSign style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'success',
            onClick: () => alert('pay me'),
        },
        {
            key: 'profile',
            label: (
                <Flex fullWidth center>
                    <FaIdBadge style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'dark',
            onClick: () => alert('dis is who i am'),
        },
        {
            key: 'emergency',
            label: (
                <Flex fullWidth center>
                    <FaShieldAlt style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'danger',
            onClick: () => alert('plz halp me'),
        },
    ], []);

    useMessageEvent<PhoneOpenEvent>(PhoneOpenEvent, event => {
        setIsVisible(true);
        setItemID(event.getParser().itemID);
    });

    function onClose() {
        setIsVisible(false);
    }
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
                                <div style={{ position: 'absolute', top: 25, left: 25 }}>
                                    <Text color="white" bold fontSize={2} onClick={onClose} style={{ cursor: 'pointer' }}>
                                        <FaTimesCircle />
                                    </Text>
                                    <Text bold fontSize={2}>FLEXPHONE</Text>
                                    <Grid>
                                        {
                                            phoneApps.map(app => (
                                                <Column key={`app_${app.key}`} size={6}>
                                                    <Button variant={app.color} onClick={app.onClick}>
                                                        {app.label}
                                                    </Button>
                                                </Column>
                                            ))
                                        }
                                    </Grid>

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
        </DraggableWindow>
    )
}