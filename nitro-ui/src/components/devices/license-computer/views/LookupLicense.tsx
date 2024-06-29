import { useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { LicenseType, RoomUsersListRow } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { useLicenseStatus } from "../../../../hooks/roleplay/use-license-status";
import { UserSelect } from "../../../roleplay/UserSelect";


export interface LookupLicenseProps {
    corpID: number;
    licenseType: LicenseType;
    onClose(): void;
}

export function LookupLicense({ corpID, licenseType, onClose }: LookupLicenseProps) {
    const [confirm, setConfirm] = useState(false);
    const corpInfo = useCorpData(corpID);
    const [user, setUser] = useState<RoomUsersListRow>();
    const rpStats = useRoleplayStats(user?.id);
    const userLicenseStatus = useLicenseStatus(licenseType, rpStats.userID)

    function onApplyForLicense() {
        alert('oh yea do that');
    }

    const [statusColor, statusText] = userLicenseStatus.licenseIsValid
        ? ['green', 'valid']
        : ['red', 'expired']

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CorpBadge corpID={corpID} />
                <Text bold fontSize={4}>{corpInfo.name}</Text>
            </div>
            <Grid fullHeight={false}>
                <Column size={6} justifyContent="center">
                    <Text bold fontSize={4}>Lookup license</Text>
                    <UserSelect userID={user?.id} onChange={setUser} />
                </Column>
                <Column size={6} justifyContent="center">
                    {
                        user && (
                            <Grid fullHeight={false}>
                                <Column size={4} justifyContent="center">
                                    {rpStats.figure && <LayoutAvatarImageView headOnly figure={rpStats.figure} direction={2} style={{ height: 80 }} />}
                                </Column>
                                <Column size={8} justifyContent="center">
                                    <Text bold fontSize={5}>License Status</Text>
                                    <Text fontSize={4} style={{ color: statusColor }}>{statusText}</Text>
                                    {
                                        !userLicenseStatus.licenseIsValid && (
                                            <Button style={{ width: '100%' }} type="button" variant="success" onClick={onApplyForLicense}>
                                                Apply for License
                                            </Button>
                                        )
                                    }
                                </Column>
                            </Grid >
                        )
                    }
                </Column>
            </Grid >

        </>
    )
}