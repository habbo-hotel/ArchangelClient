import { ReactNode, useEffect, useState } from 'react';
import { useMessageEvent, useSessionInfo } from '../../../hooks';
import { BankOpenATMEvent } from '@nitro-rp/renderer';
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../common';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useBankAccount } from '../../../hooks/roleplay/use-bank-account';
import { useRoleplayStats } from '../../../hooks/roleplay/use-rp-stats';
import { FaUndo } from 'react-icons/fa';

enum ATMMode {
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT"
}

export function BankATM() {
    const { userInfo } = useSessionInfo();
    const [bankCorpID, setBankCorpID] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const rpStats = useRoleplayStats(userInfo?.userId)
    const [mode, setMode] = useState(ATMMode.WITHDRAW);
    const [amount, setAmount] = useState(0);
    const bankInfo = useBankAccount(bankCorpID, userInfo?.username)

    useEffect(() => {
        setAmount(0);
    }, [mode]);

    useMessageEvent<BankOpenATMEvent>(BankOpenATMEvent, () => {
        setIsVisible(true);
    });

    useMessageEvent<BankOpenATMEvent>(BankOpenATMEvent, event => {
        setBankCorpID(event.getParser().corpID);
    });

    function onWithdraw() {

    }

    function onDeposit() {

    }

    function getButton(btnMode: ATMMode): { type: ATMMode; maxAmount: number; btnLabel: string; btnAction: () => void; } {
        const [type, maxAmount, btnLabel, btnAction] = btnMode === ATMMode.DEPOSIT
            ? [ATMMode.WITHDRAW, rpStats.cashBalance, 'Deposit', onDeposit]
            : [ATMMode.DEPOSIT, bankInfo.checkingBalance, 'Withdraw', onWithdraw]
        return { type, maxAmount, btnLabel, btnAction }
    }

    const [curMode, newMode] = [
        getButton(mode),
        getButton(mode === ATMMode.DEPOSIT ? ATMMode.WITHDRAW : ATMMode.DEPOSIT),
    ]

    if (!isVisible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="bankATM" className="nitro-inventory">
            <NitroCardHeaderView headerText="ATM" onCloseClick={() => setIsVisible(false)} />
            <NitroCardContentView>
                <Grid fullHeight={false}>
                    <Column center size={4} overflow="hidden">
                        <Text bold fontSize={5}>Cash on hand:</Text>
                        <Text fontSize={4}>${Number(rpStats.cashBalance).toLocaleString()}</Text>
                    </Column>
                    <Column center size={4} overflow="auto">
                        <Text bold fontSize={5}>Bank account:</Text>
                        <Text fontSize={4}>${Number(bankInfo.checkingBalance).toLocaleString()}</Text>
                    </Column>
                </Grid>
                <hr />
                <Grid fullHeight={false}>
                    <Column center size={12}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <Text bold fontSize={6}>{curMode.btnLabel}:</Text>
                                <input type="range" min={0} max={curMode.maxAmount} value={amount} onChange={e => setAmount(e.currentTarget.value as any)} style={{ width: '100%', height: 12, marginTop: 4 }} />
                            </div>
                            <Text fontSize={4}>${Number(amount).toLocaleString()}</Text>
                            <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
                                <Button disabled={curMode.maxAmount === 0} variant="primary" onClick={curMode.btnAction}>
                                    {curMode.btnLabel}
                                </Button>
                                <Text fontSize={6}>or</Text>
                                <Button variant="secondary" onClick={() => setMode(newMode.type)}>
                                    {newMode.btnLabel}
                                </Button>
                            </div>
                        </div>
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView >
    )
}