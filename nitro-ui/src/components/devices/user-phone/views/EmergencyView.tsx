import { FaCaretLeft, FaShieldAlt } from "react-icons/fa";
import { Column, Flex, Grid, Text } from "../../../../common";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { CorpType } from "@nitro-rp/renderer";

interface EmergencyViewProps {
    goBack(): void;
}

export function EmergencyView({ goBack }: EmergencyViewProps) {
    const [corpID, setCorpID] = useState<number>();
    const [corpType, setCorpType] = useState<CorpType>();
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
                        Emergency
                    </Text>
                </Flex>
            </Flex >
            <Grid fullHeight={false} fullWidth={true}>
                <Column size={12}>
                    <Text className="col-2" fontSize={5}>Message</Text>
                    <textarea className="form-control form-control-sm" value={message} maxLength={254} rows={4} onChange={event => setMessage(event.target.value)} />
                    <Text className="col-2" fontSize={5}>Type</Text>
                    <Column fullWidth gap={1}>
                        <select className="form-select form-select-sm" value={corpType}>
                            <option selected={!corpType} disabled>Select an option</option>
                            <option value="police">Police</option>
                            <option value="paramedic">Paramedic</option>
                        </select>
                    </Column>
                    <Button variant="success">
                        Request emergency services
                    </Button>
                </Column>
            </Grid>
        </>
    )
}