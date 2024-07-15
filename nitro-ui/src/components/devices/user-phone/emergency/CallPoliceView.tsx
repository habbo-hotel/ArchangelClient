import { FaCaretLeft, FaShieldAlt } from "react-icons/fa";
import { Column, Flex, Grid, Text } from "../../../../common";
import { Button } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { CallPolice } from "../../../../api/roleplay/police/CallPolice";

interface CallPoliceViewProps {
    goBack(): void;
}

export function CallPoliceView({ goBack }: CallPoliceViewProps) {
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    function onSend(event: SyntheticEvent) {
        event.preventDefault();
        if (!message) {
            return;
        }
        CallPolice(message);
        setMessage('');
        setMessageSent(true);
    }

    return (
        <>
            <Flex center={true} justifyContent="between" fullWidth={true}>
                <Text color="white" bold fontSize={2} onClick={goBack} style={{ cursor: 'pointer' }}>
                    <FaCaretLeft />
                </Text>
                <Flex center>
                    <FaShieldAlt style={{ marginRight: 8, fontSize: '1.8rem' }} />
                    <Text fontSize={2}>
                        Police
                    </Text>
                </Flex>
            </Flex >
            {
                messageSent
                    ? (
                        <Flex center column fullWidth fullHeight>
                            <Text fontSize={4} center>Police have been notified and will respond when available.</Text>
                            <br />
                            <Button variant="success" onClick={goBack}>
                                Go back
                            </Button>
                        </Flex>
                    )
                    : (
                        <Grid fullHeight={false} fullWidth={true}>
                            <Column size={12}>
                                <form onSubmit={onSend}>
                                    <Text fontSize={5}>Describe the situation</Text>
                                    <textarea className="form-control form-control-sm" value={message} maxLength={254} rows={8} placeholder="Kevin is going crazy beating people up in here" onChange={event => setMessage(event.target.value)} />
                                    <br />
                                    <Button variant="success" onClick={onSend}>
                                        Request emergency services
                                    </Button>
                                </form>
                            </Column>
                        </Grid>
                    )
            }
        </>
    )
}