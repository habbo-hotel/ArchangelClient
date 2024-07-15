import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../../common";
import { useState } from "react";
import { PoliceCallData, PoliceCallInfoEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../../hooks";
import { FaBullhorn, FaCheck, FaFlag, FaTimes, FaVolumeMute } from "react-icons/fa";

export function PoliceCall() {
    const [isVisible, setIsVisible] = useState(false)
    const [callInfo, setCallInfo] = useState<PoliceCallData>();

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
                    <Button fullWidth variant="success">
                        <FaCheck style={{ marginRight: 8 }} />
                        Accept
                    </Button>
                    <Button fullWidth variant="danger">
                        <FaFlag style={{ marginRight: 8 }} />
                        Flag
                    </Button>
                </Flex>
            </NitroCardContentView>
        </NitroCardView >
    )
}