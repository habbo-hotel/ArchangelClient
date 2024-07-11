import { FaCaretLeft, FaUsers } from "react-icons/fa";
import { Column, Flex, Grid, Text } from "../../../../common";
import { useBankList } from "../../../../hooks/roleplay/use-bank-list";
import { BankAccountItemView } from "./BankAccountItemView";

interface BankAccountListViewProps {
    goBack(): void;
}

export function BankAccountListView({ goBack }: BankAccountListViewProps) {
    const banks = useBankList();
    return (
        <>
            <Flex center={true} justifyContent="between">
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaUsers style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Bank Accounts
                    </Text>
                </Flex>
            </Flex >
            <Grid fullHeight={true} fullWidth={true} gap={4} style={{ padding: 8 }}>
                {
                    banks.map(bank => <BankAccountItemView bank={bank} key={`bank_${bank.corpID}`} />)
                }
            </Grid>
        </>
    )
}