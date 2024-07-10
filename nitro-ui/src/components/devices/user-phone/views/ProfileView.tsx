import { FaCaretLeft, FaIdCard } from "react-icons/fa";
import { Flex, Text } from "../../../../common";

interface ProfileViewProps {
    goBack(): void;
}

export function ProfileView({ goBack }: ProfileViewProps) {
    return (
        <>
            <Flex center={true} justifyContent="between">
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaIdCard style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Profile
                    </Text>
                </Flex>
            </Flex >
        </>
    )
}