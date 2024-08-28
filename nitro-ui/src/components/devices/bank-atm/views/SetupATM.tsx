import { Button } from "react-bootstrap";
import { Column, Grid, Text } from "../../../../common";
import { CorpBadge } from "../../../left-side/roleplay-stats/corp-badge/CorpBadge";
import { BankSelect } from "../../../roleplay/BankSelect";
import { useState } from "react";
import { BankListRow } from "@nitro-rp/renderer";
import { BankConnectATM } from "../../../../api/roleplay/bank/BankConnectATM";

export interface SetupATMProps {
    itemID: number;
    onConnected(corpID: number): void;
}

export function SetupATM({ itemID, onConnected }: SetupATMProps) {
    const [bank, setBank] = useState<BankListRow>();

    function onConnect() {
        if (!bank) {
            return;
        }
        BankConnectATM(itemID, bank.corpID);
        onConnected(bank.corpID);
    }

    return (
        <Grid fullHeight={false}>
            <Column size={12}>
                <Text bold fontSize={4}>Configure ATM</Text>
                <Text fontSize={5}>This ATM has never been setup before.  Please connect it to a bank below.</Text>
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