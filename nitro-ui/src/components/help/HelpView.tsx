import { ILinkEventTracker } from '@nitro-rp/renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, LocalizeText, RemoveLinkEventTracker, ReportState, SendMessageComposer } from '../../api';
import { Base, Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { DescribeReportView } from './views/DescribeReportView';
import { HelpIndexView } from './views/HelpIndexView';
import { NameChangeView } from './views/name-change/NameChangeView';
import { ReportSummaryView } from './views/ReportSummaryView';
import { SanctionSatusView } from './views/SanctionStatusView';
import { SelectReportedChatsView } from './views/SelectReportedChatsView';
import { SelectReportedUserView } from './views/SelectReportedUserView';
import { SelectTopicView } from './views/SelectTopicView';
import { Button } from 'react-bootstrap';

export const HelpView: FC<{}> = props => {
    const [isVisible, setIsVisible] = useState(false);

    const onClose = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                    case 'tour':
                        // todo: launch tour
                        return;
                    case 'report':
                        if ((parts.length >= 5) && (parts[2] === 'room')) {
                            const roomId = parseInt(parts[3]);
                            const unknown = unescape(parts.splice(4).join('/'));
                            //this.reportRoom(roomId, unknown, "");
                        }
                        return;
                }
            },
            eventUrlPrefix: 'help/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);



    return (
        <>
            {isVisible &&
                <NitroCardView className="nitro-help" theme="primary-slim">
                    <NitroCardHeaderView headerText={LocalizeText('help.button.cfh')} onCloseClick={onClose} />
                    <NitroCardContentView className="text-black">
                        <Grid>
                            <Column center size={5} overflow="hidden">
                                <Base className="index-image" />
                            </Column>
                            <Column justifyContent="between" size={7} overflow="hidden">
                                <Column center gap={1}>
                                    <Text fontSize={3}>How to play</Text>
                                    <Text fontSize={5}>Everything you need to become a pro</Text>
                                </Column>
                                <Column gap={1}>
                                    <Button>Storyline</Button>
                                    <Button>Controls</Button>
                                    <Button>Factions</Button>
                                    <Button>Corporations</Button>
                                </Column>
                            </Column>
                        </Grid>
                    </NitroCardContentView>
                </NitroCardView>}
            <SanctionSatusView />
            <NameChangeView />
        </>
    );
}
