import { FaUsers } from "react-icons/fa";
import { Flex, Text } from "../../../../common";

export function ContactsView() {
    return (
        <>
            <Flex center>
                <FaUsers style={{ marginRight: 8, fontSize: '1.8rem' }} />
                <Text fontSize={2}>
                    Contacts
                </Text>
            </Flex>
        </>
    )
}