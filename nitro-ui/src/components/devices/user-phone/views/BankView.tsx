import { FaCaretLeft, FaDollarSign } from "react-icons/fa";
import { Flex, Grid, Text } from "../../../../common";

interface BankViewProps {
    goBack(): void;
}

export function BankView({ goBack }: BankViewProps) {
    return (
        <>
            <Flex center={true} justifyContent="between" fullWidth={true}>
                <Flex center fullWidth={true}>
                    <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                        <FaCaretLeft />
                    </Text>
                </Flex>
                <Flex center fullWidth={true}>
                    <FaDollarSign style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Bank
                    </Text>
                </Flex>
            </Flex >
        </>
    )
}