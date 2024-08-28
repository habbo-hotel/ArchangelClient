import { CorpType } from "@nitro-rp/renderer";
import { Column, Flex, Grid, Text } from "../../../../../common";
import { useCorpData } from "../../../../../hooks/roleplay/use-corp-data";
import { CorpManagerViewProps } from "../../CorpManager";
import { CorpBadge } from "../../../../left-side/roleplay-stats/corp-badge/CorpBadge";
import { FaInfoCircle, FaShieldAlt } from "react-icons/fa";

export function CorpInfo({ corpID }: CorpManagerViewProps) {
    const corpData = useCorpData(corpID)
    return (
        <Grid fullHeight={false} style={{ padding: 16 }}>
            <Column center size={6} alignItems="start">
                <Text bold fontSize={5}>
                    <FaInfoCircle size={24} style={{ marginRight: 8 }} />
                    Info
                </Text>
            </Column>
            <Column center size={12} alignItems="center">
                <Flex alignItems="center" gap={1}>
                    <CorpBadge corpID={corpID} />
                </Flex>
            </Column>
            <Column size={2} />
            <Column size={8}>
                <Text className="col-2" fontSize={5}>Name</Text>
                <input type="text" className="form-control form-control-sm" value={corpData.name} maxLength={29} onChange={event => console.log(event.target.value)} />
                <Text className="col-2" fontSize={5}>Description</Text>
                <textarea className="form-control form-control-sm" value={corpData.description} maxLength={254} onChange={event => console.log(event.target.value)} />
                <Text className="col-2" fontSize={5}>Type</Text>
                <Column fullWidth gap={1}>
                    <select className="form-select form-select-sm" disabled>
                        {Object.values(CorpType).map(corpType => <option key={corpType} value={corpType}>{corpType}</option>)}
                    </select>
                </Column>
            </Column>
        </Grid>
    )
}