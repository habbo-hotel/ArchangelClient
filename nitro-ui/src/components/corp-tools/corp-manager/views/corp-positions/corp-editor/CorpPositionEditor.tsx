import { ReactNode, useEffect, useState } from "react";
import { Column, Flex, Grid, LayoutAvatarImageView, Text } from "../../../../../../common";
import { CorpPositionInfoData, CorpPositionListData } from "@nitro-rp/renderer";
import { corpChangeClothes } from "../../../../../../api/roleplay/corp/CorpChangeClothes";
import { Button } from "react-bootstrap";
import { useSessionInfo } from "../../../../../../hooks";
import { useRoleplayStats } from "../../../../../../hooks/roleplay/use-rp-stats";
import { useCorpPositionData } from "../../../../../../hooks/roleplay/use-corp-position-data";
import { useCorpPositionList } from "../../../../../../hooks/roleplay/use-corp-position-list";

export interface CorpPositionEditorProps {
    children?: ReactNode;
    corpID: number;
    corpPositionID?: number;
    onSave(corpPositionDTO: Omit<CorpPositionInfoData, 'id'>): void;
}

const PERM_KEYS: Array<keyof CorpPositionInfoData> = ['canHire', 'canFire', 'canPromote', 'canDemote', 'canWorkAnywhere'];

export function CorpPositionEditor({ children, corpID, corpPositionID, onSave }: CorpPositionEditorProps) {
    const { userInfo = null } = useSessionInfo();
    const corpPositions = useCorpPositionList(corpID);
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const corpPosition = useCorpPositionData(corpID, corpPositionID);
    const [positionDTO, setPositionDTO] = useState<Omit<CorpPositionInfoData, 'id'>>({
        corpID,
        name: '',
        orderID: 1,
        motto: '',
        salary: 5,
        maleUniform: '',
        femaleUniform: '',
        canHire: false,
        canFire: false,
        canPromote: false,
        canDemote: false,
        canWorkAnywhere: false,
    });

    useEffect(() => {
        console.log(corpPosition)
        setPositionDTO({
            corpID,
            name: corpPosition?.name ?? '',
            orderID: corpPosition?.orderID ?? 1,
            motto: corpPosition?.motto ?? '',
            salary: corpPosition?.salary ?? 5,
            maleUniform: corpPosition?.maleUniform ?? '',
            femaleUniform: corpPosition?.femaleUniform ?? '',
            canHire: !!corpPosition?.canHire,
            canFire: !!corpPosition?.canFire,
            canPromote: !!corpPosition?.canPromote,
            canDemote: !!corpPosition?.canDemote,
            canWorkAnywhere: !!corpPosition?.canWorkAnywhere,
        })
    }, [corpPosition]);

    function onUpdate(changes: Partial<Omit<CorpPositionInfoData, 'id'>>) {
        setPositionDTO(_ => ({
            ..._,
            ...changes,
        }))
    }

    function onTogglePerm<K extends keyof CorpPositionInfoData>(key: K) {
        setPositionDTO(_ => ({
            ..._,
            [key]: !_[key as any],
        }))
    }

    function onChangeUniform() {

    }

    function onSavePosition() {
        console.log(positionDTO)
        onSave({
            ...positionDTO,
            orderID: corpPositions.length + 1,
        });
    }

    return (
        <Grid fullHeight fullWidth>
            <Column size={6}>
                <Flex alignItems="center" gap={2}>
                    <Text bold center className="col-2">Name</Text>
                    <input type="text" className="form-control form-control-sm" value={positionDTO.name} maxLength={29} onChange={event => onUpdate({ name: event.currentTarget.value })} />
                </Flex>
                <Flex alignItems="center" gap={2}>
                    <Text bold center className="col-2">Motto</Text>
                    <input type="text" className="form-control form-control-sm" value={positionDTO.motto} maxLength={29} onChange={event => onUpdate({ motto: event.currentTarget.value })} />
                </Flex>
                <Flex alignItems="center" gap={2}>
                    <Text bold center className="col-2">Salary</Text>
                    <input type="range" min={0} max={100} value={positionDTO.salary} onChange={e => onUpdate({ salary: Number(e.currentTarget.value) })} style={{ width: '100%', height: 30, marginTop: 4 }} />
                    <Text fontSize={6}><b>${Number(positionDTO.salary).toLocaleString()}</b>/minute</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                    <Grid>
                        {
                            PERM_KEYS.map(key => (
                                <Column size={4} alignItems="center" key={`key_${key}`} gap={2}>
                                    <Text bold center className="col-2">{key.replace('can', '')}</Text>
                                    <input className="form-check-input" type="checkbox" checked={!!positionDTO[key]} onChange={() => onTogglePerm(key)} />
                                </Column>
                            ))
                        }
                    </Grid>
                </Flex>
                <Flex alignItems="center" gap={2}>
                    <LayoutAvatarImageView className="avatar" figure={corpChangeClothes(roleplayStats.figure, positionDTO.maleUniform)} direction={2} style={{ height: 80 }} />
                    <LayoutAvatarImageView className="avatar" figure={corpChangeClothes(roleplayStats.figure, positionDTO.maleUniform)} direction={2} style={{ height: 80 }} />
                </Flex>
            </Column>
            <Column size={6}>
                <Flex alignItems="center" gap={2} fullHeight>
                    ..
                </Flex>
                <Flex column alignItems="center" gap={2}>
                    <Button style={{ width: '100%' }} size="lg" type="button" variant="success" onClick={onSavePosition}>
                        Save
                    </Button>
                    <Text>or</Text>
                    <Button style={{ width: '100%' }} size="sm" type="button" variant="secondary" onClick={onChangeUniform}>
                        Change Uniform
                    </Button>
                    {children}
                </Flex>
            </Column>
        </Grid>
    )
}