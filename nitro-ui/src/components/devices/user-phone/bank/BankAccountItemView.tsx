import { Column, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";
import { BankListRow } from "@nitro-rp/renderer";
import { useSessionInfo } from "../../../../hooks";
import { useBankAccount } from "../../../../hooks/roleplay/use-bank-account";

interface BankAccountItemViewProps {
    bank: BankListRow;
}

export function BankAccountItemView({ bank }: BankAccountItemViewProps) {
    const { userInfo } = useSessionInfo();
    const bankAccount = useBankAccount(bank.corpID, userInfo?.username);
    if (bankAccount.userID <= 0) {
        return null;
    }
    return (
        <Column size={6} center className="bg-muted" style={{ height: 100, padding: 4, borderRadius: 4 }}>
            <CorpBadge corpID={bank.corpID} />
            <Text fontSize={5}>{bank.corpName}</Text>
            <Text bold fontSize={4}>$ {bankAccount.checkingBalance}</Text>
        </Column>
    )
}