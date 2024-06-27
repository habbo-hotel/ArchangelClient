import { useState, useEffect } from "react";
import { useSessionInfo } from "../../../../hooks";
import { FaInfoCircle } from "react-icons/fa";
import { Column, Grid, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { Button } from "react-bootstrap";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { useBankAccount } from "../../../../hooks/roleplay/use-bank-account";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { UserSelect } from "../../components/user-select/UserSelect";

enum ATMMode {
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT"
}

export interface LookupAccountProps {
    bankCorpID: number;
    onClose(): void;
}

export function LookupAccount({ bankCorpID, onClose }: LookupAccountProps) {
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId)
    const [mode, setMode] = useState(null);
    const [amount, setAmount] = useState(0);
    const corpInfo = useCorpData(bankCorpID);
    const bankInfo = useBankAccount(bankCorpID, userInfo?.username);
    const [maxAmount, btnLabel, btnAction]: [number, string, () => void] = mode === ATMMode.DEPOSIT
        ? [rpStats.cashBalance, 'Deposit', onDeposit]
        : [bankInfo.checkingBalance, 'Withdraw', onWithdraw]


    function onWithdraw() {
        onClose();
    }

    function onDeposit() {
        onClose();
    }

    useEffect(() => {
        setAmount(0);
    }, [mode]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CorpBadge corpID={bankCorpID} />
                <Text bold fontSize={4}>{corpInfo.name}</Text>
            </div>
            <div style={{ display: 'flex', marginTop: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text bold fontSize={4}>Lookup account</Text>
                <UserSelect />
            </div>
        </>
    )
}