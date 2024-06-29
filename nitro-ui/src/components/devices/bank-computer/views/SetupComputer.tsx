import { Button } from "react-bootstrap";
import { Column, Grid, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { useState } from "react";
import { BankListRow } from "@nitro-rp/renderer";
import { BankConnectComputer } from "../../../../api/roleplay/bank/BankConnectComputer";
import { BankSelect } from "../../../roleplay/BankSelect";

export interface SetupComputerProps {
    itemID: number;
    onClose(): void;
}

export function SetupComputer({ itemID, onClose }: SetupComputerProps) {
    const [bank, setBank] = useState<BankListRow>();

    function onConnect() {
        if (!bank) {
            return;
        }
        BankConnectComputer(itemID, bank.corpID);
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
                        {bank?.corpID && <CorpBadge corpID={bank.corpID} />}
                    </Column>
                    <Column size={10}>
                        <BankSelect bankID={bank?.corpID} onChange={setBank} />
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