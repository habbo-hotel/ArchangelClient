import { FaCaretLeft } from "react-icons/fa";
import { Column, Grid, Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { UserSelect } from "../../../../roleplay/UserSelect";
import { RoomUsersListRow } from "@nitro-rp/renderer";
import { useState } from "react";
import { CorpPositionSelect } from "../../../../roleplay/CorpPositionSelect";
import { Button } from "react-bootstrap";
import { CorpOfferJob } from "../../../../../api/roleplay/corp/CorpOfferJob";
import { useSessionInfo } from "../../../../../hooks";

export interface CorpEditPositionProps extends CorpManagerViewProps {
    onToggle(): void;
}
export function CorpHireEmployee({ corpID, onToggle }: CorpEditPositionProps) {
    const { userInfo } = useSessionInfo();
    const [user, setUser] = useState<RoomUsersListRow>();
    const [corpPositionID, setCorpPositionID] = useState<number>();

    const disabled = !user || user?.id === userInfo?.userId || !corpPositionID;

    function onChangeUser(user: RoomUsersListRow) {
        setUser(user)
    }

    function onHireUser() {
        if (disabled) return;
        CorpOfferJob(user.username)
        onToggle();
    }

    return (
        <Grid fullHeight={false} style={{ padding: 16 }}>
            <Column center size={12} alignItems="start">
                <Text bold fontSize={5}>
                    <FaCaretLeft size={24} style={{ cursor: 'pointer', marginRight: 8 }} onClick={onToggle} />
                    Add Employee
                </Text>
            </Column>
            <Column size={8}>
                <Text className="col-2" fontSize={5}>Username</Text>
                <UserSelect userID={user?.id} onChange={onChangeUser} />
                <Text className="col-2" fontSize={5}>Position</Text>
                <CorpPositionSelect corpID={corpID} corpPositionID={corpPositionID} onChange={pos => setCorpPositionID(pos.id)} />
                <Button disabled={disabled} size="lg" type="button" variant="success" onClick={onHireUser}>
                    {
                        user?.id === userInfo?.userId ? "You can't hire yourself" : "Hire"
                    }
                </Button>
            </Column>
        </Grid>
    )
}