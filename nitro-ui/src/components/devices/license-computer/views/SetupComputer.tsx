import { Button } from "react-bootstrap";
import { Column, Grid, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { useState } from "react";
import { LicenseAgencyData } from "@nitro-rp/renderer";
import { LicenseAgencySelect } from "../../../roleplay/LicenseAgencySelect";
import { LicenseConnectComputer } from "../../../../api/roleplay/license/LicenseConnectComputer";

export interface SetupComputerProps {
    itemID: number;
    onClose(): void;
}

export function SetupComputer({ itemID, onClose }: SetupComputerProps) {
    const [licenseAgency, setLicenseAgency] = useState<LicenseAgencyData>();

    function onConnect() {
        if (!licenseAgency) {
            return;
        }
        LicenseConnectComputer(itemID, licenseAgency.corpID);
        onClose();
    }

    return (
        <Grid fullHeight={false}>
            <Column size={12}>
                <Text bold fontSize={4}>Configure Computer</Text>
                <Text fontSize={5}>This Computer has never been setup before.  Please connect it to a bank below.</Text>
            </Column>
            <Column center size={6}>
                <Grid fullHeight={false}>
                    <Column center size={2}>
                        {licenseAgency?.corpID && <CorpBadge corpID={licenseAgency.corpID} />}
                    </Column>
                    <Column size={10}>
                        <LicenseAgencySelect corpID={licenseAgency?.corpID} onChange={setLicenseAgency} />
                    </Column>
                </Grid>
            </Column>
            <Column center size={6}>
                <Button style={{ width: '100%' }} size="lg" type="button" variant="outline-success" onClick={onConnect}>
                    Connect
                </Button>
            </Column>
        </Grid>
    )
}