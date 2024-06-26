import { useState, useEffect } from "react";
import { useSessionInfo } from "../../../../hooks";
import { FaInfoCircle } from "react-icons/fa";
import { Column, Grid, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { Button } from "react-bootstrap";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { useBankAccount } from "../../../../hooks/roleplay/use-bank-account";

enum ATMMode {
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT"
}

export interface ManageAccountProps {
    bankCorpID: number;
}

export function ManageAccount({ bankCorpID }: ManageAccountProps) {
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId)
    const [mode, setMode] = useState(null);
    const [amount, setAmount] = useState(0);
    const bankInfo = useBankAccount(bankCorpID, userInfo?.username);
    const [maxAmount, btnLabel, btnAction]: [number, string, () => void] = mode === ATMMode.DEPOSIT
        ? [rpStats.cashBalance, 'Deposit', onDeposit]
        : [bankInfo.checkingBalance, 'Withdraw', onWithdraw]

    function onWithdraw() {

    }

    function onDeposit() {

    }

    useEffect(() => {
        setAmount(0);
    }, [mode]);

    return (
        <>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CorpBadge corpID={2} />
                <Text bold fontSize={4}>Bank of Bobba</Text>
            </div>
            <Grid fullHeight={false}>
                <Column center size={6} overflow="hidden">
                    <Text bold fontSize={5}>Cash on hand:</Text>
                    <Text fontSize={4}>${Number(rpStats.cashBalance).toLocaleString()}</Text>
                </Column>
                <Column center size={6} overflow="auto">
                    <Text bold fontSize={5}>Bank account:</Text>
                    <Text fontSize={4}>${Number(bankInfo.checkingBalance).toLocaleString()}</Text>
                </Column>
            </Grid>
            <Grid fullHeight={false}>
                {
                    !mode && (
                        <>
                            <Column center size={12}>
                                <Text bold>What do you want to do?</Text>
                            </Column>
                            <Column center size={6}>
                                <Button style={{ width: '100%' }} size="lg" variant="outline-danger" onClick={() => setMode(ATMMode.WITHDRAW)}>
                                    Withdraw
                                </Button>
                            </Column>
                            <Column center size={6}>
                                <Button style={{ width: '100%' }} size="lg" variant="outline-success" onClick={() => setMode(ATMMode.DEPOSIT)}>
                                    Deposit
                                </Button>
                            </Column>
                        </>
                    )
                }
                {
                    mode && (
                        <Column center size={12}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text fontSize={4}>${Number(amount).toLocaleString()}</Text>
                                <input type="range" min={0} max={maxAmount} value={amount} onChange={e => console.log(e.currentTarget.value as any)} style={{ width: '100%', height: 30, marginTop: 4 }} />
                            </div>
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text underline style={{ cursor: 'pointer' }} onClick={() => setMode(null)}>Cancel</Text>
                                <Text>or</Text>
                                <Button disabled={maxAmount === 0} variant="success" onClick={btnAction}>
                                    Confirm {btnLabel}
                                </Button>
                            </div>
                        </Column>
                    )
                }
            </Grid>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text bold>
                    <FaInfoCircle style={{ marginRight: 8 }} />
                </Text>
                <Text>Some banks may charge higher transaction fees depending on membership status.</Text>
            </div>
        </>
    )
}