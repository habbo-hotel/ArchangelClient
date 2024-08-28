import { useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../common";
import { CorpBadge } from "../../../left-side/roleplay-stats/corp-badge/CorpBadge";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { LicenseType, RoomUsersListRow } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { useLicenseStatus } from "../../../../hooks/roleplay/use-license-status";
import { UserSelect } from "../../../roleplay/UserSelect";
import { LicenseOffer } from "../../../../api/roleplay/license/LicenseOffer";

export interface LookupLicenseProps {
    corpID: number;
    licenseType: LicenseType;
    onClose(): void;
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function LookupLicense({ corpID, licenseType, onClose }: LookupLicenseProps) {
    const corpInfo = useCorpData(corpID);
    const [user, setUser] = useState<RoomUsersListRow>();
    const rpStats = useRoleplayStats(user?.id);
    const userLicenseStatus = useLicenseStatus(licenseType, rpStats.userID)

    function onApplyForLicense() {
        if (!user) return;
        LicenseOffer(user.username, licenseType);
        onClose();
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
            <Grid center fullHeight={false}>
                <Column center size={6} justifyContent="center">
                    <Text bold fontSize={4}>{capitalizeFirstLetter(LicenseType[licenseType])} License:</Text>
                    <UserSelect userID={user?.id} onChange={setUser} />
                </Column>
                <Column center size={6} justifyContent="center">
                    {
                        user && (
                            <Grid center fullHeight={false}>
                                <Column center size={4} justifyContent="center" alignItems="center">
                                    {rpStats.figure && <LayoutAvatarImageView figure={rpStats.figure} direction={2} style={{ height: 80 }} />}
                                </Column>
                                <Column center size={8} justifyContent="center">
                                    <Text bold fontSize={5}>Valid License?</Text>
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