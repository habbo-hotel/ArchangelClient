import { FaCaretLeft, FaShieldAlt } from "react-icons/fa";
import { Column, Flex, Grid, Text } from "../../../../common";
import { Button } from "react-bootstrap";
import { useState } from "react";

interface CallPoliceViewProps {
    goBack(): void;
}

export function CallPoliceView({ goBack }: CallPoliceViewProps) {
    const [message, setMessage] = useState('');

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
            <Grid fullHeight={false} fullWidth={true}>
                <Column size={12}>
                    <Text fontSize={5}>Describe the situation</Text>
                    <textarea className="form-control form-control-sm" value={message} maxLength={254} rows={8} placeholder="Kevin is going crazy beating people up in here" onChange={event => setMessage(event.target.value)} />
                    <Button variant="success">
                        Request emergency services
                    </Button>
                </Column>
            </Grid>
        </>
    )
}