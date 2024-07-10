import { FaCaretLeft, FaDollarSign } from "react-icons/fa";
import { Column, Flex, Grid, Text } from "../../../../common";
import { CorpBadge } from "../../../roleplay-stats/corp-badge/CorpBadge";

interface BankViewProps {
    goBack(): void;
}

export function BankView({ goBack }: BankViewProps) {
    return (
        <>
            <Flex center={true} justifyContent="between" fullWidth={true}>
                <Flex center>
                    <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                        <FaCaretLeft />
                    </Text>
                </Flex>
                <Flex center>
                    <FaDollarSign style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Bank Accounts
                    </Text>
                </Flex>
            </Flex >
            <Grid fullHeight={true} fullWidth={true} gap={4} style={{ padding: 8 }}>
                <Column size={6} center className="bg-muted" style={{ height: 150, padding: 4, borderRadius: 4, cursor: 'pointer' }}>
                    <CorpBadge corpID={2} />
                    <Text fontSize={5}>Bank of Bobba</Text>
                    <Text bold fontSize={4}>$400</Text>
                </Column>
                <Column size={6} center className="bg-muted" style={{ height: 150, padding: 4, borderRadius: 4, cursor: 'pointer' }}>
                    <CorpBadge corpID={4} />
                    <Text fontSize={5}>Ghetto Bank</Text>
                    <Text bold fontSize={4}>$600</Text>
                </Column>
            </Grid>
        </>
    )
}