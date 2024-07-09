import { FaIdCard } from "react-icons/fa";
import { Flex, Text } from "../../../../common";

export function ProfileView() {
    return (
        <>
            <Flex center>
                <FaIdCard style={{ marginRight: 8, fontSize: '1.8rem' }} />
                <Text fontSize={2}>
                    Profile
                </Text>
            </Flex>
        </>
    )
}