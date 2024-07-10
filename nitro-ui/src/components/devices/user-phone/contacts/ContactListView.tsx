import { FaCaretLeft, FaUsers } from "react-icons/fa";
import { Column, Flex, Grid, LayoutAvatarImageView, Text } from "../../../../common";
import { useFriends } from "../../../../hooks";
import { MessengerFriend } from "../../../../api";

interface ContactListViewProps {
    goBack(): void;
    onMessage(contact: MessengerFriend): void;
}

export function ContactListView({ goBack, onMessage }: ContactListViewProps) {
    const { onlineFriends = [] } = useFriends();
    return (
        <>
            <Flex center={true} justifyContent="between">
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaUsers style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Contacts
                    </Text>
                </Flex>
            </Flex >
            <Grid fullHeight={true} fullWidth={true} gap={4} style={{ padding: 8 }}>
                {
                    onlineFriends.map(contact => (
                        <Column size={6} center className="bg-muted" style={{ height: 150, padding: 4, borderRadius: 4, cursor: 'pointer' }} onClick={() => onMessage(contact)}>
                            <LayoutAvatarImageView className="avatar" figure={contact.figure} direction={2} style={{ height: 80 }} />
                            <Text bold fontSize={5}>{contact.name}</Text>
                        </Column>
                    ))
                }
            </Grid>
        </>
    )
}