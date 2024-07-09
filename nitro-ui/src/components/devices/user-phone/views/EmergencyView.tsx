import { FaShieldAlt } from "react-icons/fa";
import { Flex, Text } from "../../../../common";

export function EmergencyView() {
    return (
        <>
            <Flex center>
                <FaShieldAlt style={{ marginRight: 8, fontSize: '1.8rem' }} />
                <Text fontSize={2}>
                    Emergency
                </Text>
            </Flex>
        </>
    )
}