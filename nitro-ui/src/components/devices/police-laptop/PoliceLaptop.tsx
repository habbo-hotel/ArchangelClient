import { FaExclamationCircle, FaRegTimesCircle, FaUser } from "react-icons/fa";
import { Button, ColorVariantType, Column, DraggableWindow, Flex, Grid, Text } from "../../../common";
import { DeviceClose } from "../../../api/roleplay/device/DeviceClose";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useMessageEvent } from "../../../hooks";
import { LookupUserView } from "./lookup-user/LookupUserView";
import { PoliceReportListView } from "./police-reports/PoliceReportListView";
import { DeviceOpenEvent, InteractionType } from "@nitro-rp/renderer";

interface PoliceApp {
    key: string;
    label: ReactNode;
    color: ColorVariantType;
    children: ReactNode;
};

export function PoliceLaptop() {
    const [isVisible, setIsVisible] = useState(false)
    const [itemID, setItemID] = useState<number>();
    const [activeApp, setActiveApp] = useState<PoliceApp>();

    const phoneApps: Array<PoliceApp> = useMemo(() => [
        {
            key: 'lookup-user',
            label: (
                <Flex fullWidth center>
                    <FaUser style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'primary',
            children: <LookupUserView />,
        },
        {
            key: 'police-reports',
            label: (
                <Flex fullWidth center>
                    <FaExclamationCircle style={{ marginRight: 8, fontSize: '4rem' }} />
                </Flex>
            ),
            color: 'danger',
            children: <PoliceReportListView />,
        },
    ], []);

    useMessageEvent<DeviceOpenEvent>(DeviceOpenEvent, event => {
        if (event.getParser().interactionType !== InteractionType.POLICE_LAPTOP) {
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
                    <div style={{ height: '100%' }}>
                        {!activeApp && (
                            <Grid fullWidth={true} fullHeight={false} overflow="hidden" gap={2}>
                                <Flex center={true} justifyContent="between" fullWidth={true}>
                                    <Flex center>
                                        <Text fontSize={2}>
                                            Police Laptop
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
                </Flex>
            </Column>
        </DraggableWindow >
    )
}