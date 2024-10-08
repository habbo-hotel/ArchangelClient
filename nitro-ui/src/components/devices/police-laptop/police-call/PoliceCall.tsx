import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../../common";
import { useState } from "react";
import { PoliceCallData, PoliceCallInfoEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../../hooks";
import { FaCheck, FaFlag } from "react-icons/fa";
import { PoliceResolveReport } from "../../../../api/roleplay/police/PoliceResolveReport";

export function PoliceCall() {
    const [isVisible, setIsVisible] = useState(false)
    const [callInfo, setCallInfo] = useState<PoliceCallData>();

    function onResolve(flagged: boolean) {
        PoliceResolveReport(callInfo.callId, flagged);
        setCallInfo(undefined);
    }

    useMessageEvent<PoliceCallInfoEvent>(PoliceCallInfoEvent, event => {
        setIsVisible(true);
        setCallInfo(event.getParser().policeCall);
    });

    if (!isVisible || !callInfo) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="policeCall" style={{ height: 300, width: 300 }}>
            <NitroCardHeaderView headerText="Police Call" onCloseClick={() => setIsVisible(false)} />
            <NitroCardContentView>
                <Grid center className="bg-dark" fullWidth fullHeight={false} style={{ borderRadius: 8, padding: 8 }}>
                    <Column center size={4}>
                        <LayoutAvatarImageView className="avatar" figure={callInfo.reportedByFigure} direction={2} />
                    </Column>
                    <Column size={8}>
                        <Text bold fontSize={4} variant="white">{callInfo.reportedByUsername}</Text>
                        <Text bold fontSize={6} variant="white">{callInfo.message}</Text>
                    </Column>
                </Grid>
                <Flex center gap={2}>
                    <Button fullWidth variant="success" onClick={() => onResolve(false)}>
                        <FaCheck style={{ marginRight: 8 }} />
                        Accept
                    </Button>
                    <Button fullWidth variant="danger" onClick={() => onResolve(true)}>
                        <FaFlag style={{ marginRight: 8 }} />
                        Flag
                    </Button>
                </Flex>
            </NitroCardContentView>
        </NitroCardView >
    )
}