import { useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { UserSelect } from "../../components/user-select/UserSelect";
import { RoomUsersListRow } from "@nitro-rp/renderer";
import { useBankAccount } from "../../../../hooks/roleplay/use-bank-account";
import { Button } from "react-bootstrap";
import { BankAccountClose } from "../../../../api/roleplay/bank/BankAccountClose";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { BankAccountOpen } from "../../../../api/roleplay/bank/BankAccountOpen";

enum ATMMode {
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT"
}

export interface LookupAccountProps {
    bankCorpID: number;
    onClose(): void;
}

export function LookupAccount({ bankCorpID, onClose }: LookupAccountProps) {
    const [confirm, setConfirm] = useState(false);
    const corpInfo = useCorpData(bankCorpID);
    const [user, setUser] = useState<RoomUsersListRow>();
    const rpStats = useRoleplayStats(user?.id);
    const userBankAccount = useBankAccount(bankCorpID, user?.username);

    function onCloseAccount() {
        if (!user) {
            return;
        }
        if (!confirm) {
            setConfirm(true);
            return;
        }
        console.log(user.username)
        BankAccountClose(user.username);
        onClose();
    }

    function onOpenAccount() {
        if (!user || !!userBankAccount.createdAt) {
            return;
        }
        BankAccountOpen(user.username);
        onClose();
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CorpBadge corpID={bankCorpID} />
                <Text bold fontSize={4}>{corpInfo.name}</Text>
            </div>
            <Grid fullHeight={false}>
                <Column size={6} justifyContent="center">
                    <Text bold fontSize={4}>Lookup account</Text>
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
                                    {
                                        userBankAccount.createdAt
                                            ? (
                                                <>
                                                    <Text bold fontSize={5}>Balance</Text>
                                                    <Text fontSize={4}>${Number(userBankAccount.checkingBalance).toLocaleString()}</Text>
                                                    <Button style={{ width: '100%' }} type="button" variant="danger" onClick={onCloseAccount}>
                                                        {!confirm ? 'Close Account' : 'Are you sure?'}
                                                    </Button>
                                                </>
                                            )
                                            : (
                                                <>
                                                    <Text fontSize={4}>No account found.</Text>
                                                    <Button style={{ width: '100%' }} type="button" variant="success" onClick={onOpenAccount}>
                                                        Open Account
                                                    </Button>
                                                </>
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