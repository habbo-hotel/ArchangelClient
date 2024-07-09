import { FaComment } from "react-icons/fa";
import { Flex, Text } from "../../../../common";

export function MessagesView() {
    return (
        <>
            <Flex center>
                <FaComment style={{ marginRight: 8, fontSize: '1.8rem' }} />
                <Text fontSize={2}>
                    Messages
                </Text>
            </Flex>
        </>
    )
}