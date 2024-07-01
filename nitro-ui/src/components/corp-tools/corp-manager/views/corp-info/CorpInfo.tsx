import { CorpType } from "@nitro-rp/renderer";
import { Column, Flex, Text } from "../../../../../common";
import { useCorpData } from "../../../../../hooks/roleplay/use-corp-data";
import { CorpManagerViewProps } from "../../CorpManager";
import { CorpBadge } from "../../../../roleplay-stats/corp-badge/CorpBadge";

export function CorpInfo({ corpID }: CorpManagerViewProps) {
    const corpData = useCorpData(corpID)
    return (
        <Flex>
            <Column size={2}>
                <Flex alignItems="center" gap={1}>
                    <CorpBadge corpID={corpID} />
                </Flex>
            </Column>
            <Column size={10}>
                <Flex alignItems="center" gap={1}>
                    <Text center className="col-2">Name</Text>
                    <input type="text" className="form-control form-control-sm" value={corpData.name} maxLength={29} onChange={event => console.log(event.target.value)} />
                </Flex>
                <Flex alignItems="center" gap={1}>
                    <Text center className="col-2">Description</Text>
                    <textarea className="form-control form-control-sm" value={corpData.description} maxLength={254} onChange={event => console.log(event.target.value)} />
                </Flex>
                <Flex alignItems="center" gap={1}>
                    <Text center className="col-2">Type</Text>
                    <Column fullWidth gap={1}>
                        <select className="form-select form-select-sm" disabled>
                            {Object.values(CorpType).map(corpType => <option key={corpType} value={corpType}>{corpType}</option>)}
                        </select>
                    </Column>
                </Flex>
            </Column>
        </Flex>
    )
}