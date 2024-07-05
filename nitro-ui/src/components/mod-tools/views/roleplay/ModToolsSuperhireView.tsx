import { RoomUsersListRow } from '@nitro-rp/renderer';
import { useState } from 'react';
import { Column, DraggableWindowPosition, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { UserSelect } from '../../../roleplay/UserSelect';
import { CorpPositionSelect } from '../../../roleplay/CorpPositionSelect';
import { Button } from 'react-bootstrap';
import { CorpSelect } from '../../../roleplay/CorpSelect';
import { CorpSuperHire } from '../../../../api/roleplay/corp/CorpSuperhire';

interface ModToolsSuperhireViewProps {
    onToggle(): void;
}

export function ModToolsSuperhireView({ onToggle }: ModToolsSuperhireViewProps) {
    const [corpID, setCorpID] = useState<number>();
    const [user, setUser] = useState<RoomUsersListRow>();
    const [corpPositionID, setCorpPositionID] = useState<number>();
    const disabled = false;

    function onChangeUser(user: RoomUsersListRow) {
        setUser(user)
    }

    function onHireUser() {
        if (!user?.username || !corpID || !corpPositionID) {
            return;
        }
        CorpSuperHire(user.username, corpID, corpPositionID);
        onToggle();
    }

    return (
        <NitroCardView className="nitro-mod-tools-superhire" theme="primary-slim" windowPosition={DraggableWindowPosition.TOP_LEFT}>
            <NitroCardHeaderView headerText="Superhire" onCloseClick={onToggle} />
            <NitroCardContentView className="text-black h-100">
                <Grid fullHeight={false} fullWidth style={{ padding: 16, minWidth: 400 }}>
                    <Column center size={12} alignItems="start">
                        <Text bold fontSize={5}>
                            Superhire
                        </Text>
                    </Column>
                    <Column size={12}>
                        <Text className="col-2" fontSize={5}>Username</Text>
                        <UserSelect userID={user?.id} onChange={onChangeUser} />
                        <Text className="col-2" fontSize={5}>Corporation</Text>
                        <CorpSelect corpID={corpID} onChange={corp => setCorpID(corp.id)} />
                        <Text className="col-2" fontSize={5}>Position</Text>
                        <CorpPositionSelect corpID={corpID} corpPositionID={corpPositionID} onChange={pos => setCorpPositionID(pos.id)} />
                        <Button disabled={disabled} size="lg" type="button" variant="success" onClick={onHireUser}>
                            Hire
                        </Button>
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    );
}
