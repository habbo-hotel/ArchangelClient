import { ReactNode, useEffect, useMemo, useState } from "react";
import { Column, Flex, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { PhoneOpenEvent } from "@nitro-rp/renderer"
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { FaComment, FaIdBadge, FaShieldAlt, FaUsers } from "react-icons/fa";
import { DeviceClose } from "../../../api/roleplay/device/DeviceClose";

export function UserPhone() {
    const [isVisible, setIsVisible] = useState(false)
    const [itemID, setItemID] = useState<number>();

    const phoneApps: Array<{ key: string, label: ReactNode, color: ButtonVariant, onClick: () => void }> = useMemo(() => [
        {
            key: 'contacts',
            label: (
                <Flex fullWidth justifyContent="between">
                    <FaUsers style={{ marginRight: 8 }} />
                    Contacts
                </Flex>
            ),
            color: 'primary',
            onClick: () => alert('hay gurl'),
        },
        {
            key: 'messages',
            label: (
                <Flex fullWidth justifyContent="between">
                    <FaComment style={{ marginRight: 8 }} />
                    Messages
                </Flex>
            ),
            color: 'success',
            onClick: () => alert('mhmmmm wyd'),
        },
        {
            key: 'emergency',
            label: (
                <Flex fullWidth justifyContent="between">
                    <FaShieldAlt style={{ marginRight: 8 }} />
                    Emergency
                </Flex>
            ),
            color: 'danger',
            onClick: () => alert('plz halp me'),
        },
        {
            key: 'profile',
            label: (
                <Flex fullWidth justifyContent="between">
                    <FaIdBadge style={{ marginRight: 8 }} />
                    Profile
                </Flex>
            ),
            color: 'dark',
            onClick: () => alert('dis is who i am'),
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
        <NitroCardView uniqueKey="phoneScreen" className="nitro-inventory">
            <NitroCardHeaderView headerText="Phone Screen" onCloseClick={onClose} />
            <NitroCardContentView>
                <Grid fullHeight={false}>
                    <Column size={12}>
                        <Text bold fontSize={4}>Phone Apps</Text>
                    </Column>
                    {
                        phoneApps.map(app => (

                            <Column center key={`phone_app_${app.key}`} size={6}>
                                <Button className="w-100" key={`phone_app_${app.label}`} variant={app.color} onClick={app.onClick}>
                                    <Text fontSize={4} variant="white">
                                        {app.label}
                                    </Text>
                                </Button>
                            </Column>
                        ))
                    }
                </Grid>
            </NitroCardContentView>
        </NitroCardView >
    )
}