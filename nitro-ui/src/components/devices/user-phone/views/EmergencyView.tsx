import { FaCaretLeft, FaShieldAlt } from "react-icons/fa";
import { Flex, Text } from "../../../../common";

interface EmergencyViewProps {
    goBack(): void;
}

export function EmergencyView({ goBack }: EmergencyViewProps) {
    return (
        <>
            <Flex center={true} justifyContent="between">
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaShieldAlt style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Emergency
                    </Text>
                </Flex>
            </Flex >
        </>
    )
}