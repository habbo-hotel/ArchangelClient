import { FaExclamationCircle, FaPhone, FaSearch } from "react-icons/fa";
import { Button, ColorVariantType, Column, Flex, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { DeviceClose } from "../../../api/roleplay/device/DeviceClose";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useMessageEvent, useSessionInfo } from "../../../hooks";
import { LookupUserView } from "./lookup-user/LookupUserView";
import { PoliceReportListView } from "./police-reports/PoliceReportListView";
import { DeviceOpenEvent, InteractionType } from "@nitro-rp/renderer";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { MostWanted } from "./most-wanted/MostWanted";
import { PoliceCall } from "./police-call/PoliceCall";
import { CorpBadge } from "../../left-side/roleplay-stats/corp-badge/CorpBadge";

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
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId);

    function goBack() {
        setActiveApp(undefined);
    }

    const policeApps: Array<PoliceApp> = useMemo(() => [
        {
            key: 'lookup-user',
            label: (
                <Flex fullWidth center>
                    <FaSearch style={{ marginRight: 8, fontSize: '2rem' }} />
                    <Text bold fontSize={5} variant="white">Background Search</Text>
                </Flex>
            ),
            color: 'success',
            children: <LookupUserView />,
        },
        {
            key: 'police-reports',
            label: (
                <Flex fullWidth center>
                    <FaPhone style={{ marginRight: 8, fontSize: '2rem' }} />
                    <Text bold fontSize={5} variant="white">View Police Reports</Text>
                </Flex>
            ),
            color: 'secondary',
            children: <PoliceReportListView />,
        },
        {
            key: 'most-wanted',
            label: (
                <Flex fullWidth center>
                    <FaExclamationCircle style={{ marginRight: 8, fontSize: '2rem' }} />
                    <Text bold fontSize={5} variant="white">Most Wanted List</Text>
                </Flex>
            ),
            color: 'danger',
            children: <MostWanted goBack={goBack} />,
        },
    ], [goBack]);

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

    return (
        <>
            <PoliceCall />
            {
                isVisible && (
                    <NitroCardView uniqueKey="policeLaptop" className="nitro-inventory" style={{ height: 450 }}>
                        <NitroCardHeaderView headerText="Police Laptop" onCloseClick={() => setIsVisible(false)} />
                        <NitroCardContentView>
                            <div style={{ height: 450, width: '100%' }}>
                                <Flex center column>
                                    <CorpBadge corpID={rpStats.corporationID} />
                                </Flex>
                                <hr />
                                {!activeApp && (
                                    <Grid fullWidth={true} fullHeight={false} overflow="hidden" gap={2}>
                                        {policeApps.map(app => (
                                            <Column key={`app_${app.key}`} fullHeight={false} fullWidth={false} size={12} style={{ flex: 0 }}>
                                                <Button variant={app.color} onClick={() => setActiveApp(app)}>
                                                    {app.label}
                                                </Button>
                                            </Column>
                                        ))}
                                    </Grid>
                                )}
                                {activeApp && (
                                    <>
                                        {activeApp.children}

                                    </>
                                )}
                            </div>
                            <hr />
                            <div style={{ display: 'flex', gap: 8 }}>
                                <FaExclamationCircle style={{ color: 'black', fontSize: '2rem' }} />
                                <Text fontSize={6}>This is a secure system containing <b>confidential information</b>.  <b>Do not share or distribute.</b></Text>
                            </div>
                        </NitroCardContentView>
                    </NitroCardView >
                )
            }
        </>
    )
}