import { useMemo, useState } from "react";
import { Column, Flex, Grid, LayoutAvatarImageView, Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { useSessionInfo } from "../../../../../hooks";
import { CorpPositionInfoData } from "@nitro-rp/renderer";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { corpChangeClothes } from "../../../../../api/roleplay/corp/CorpChangeClothes";
import { FaCaretLeft, FaPlusCircle } from "react-icons/fa";
import { useCorpPositionList } from "../../../../../hooks/roleplay/use-corp-position-list";
import { Button } from "react-bootstrap";

export function CorpPositions({ corpID }: CorpManagerViewProps) {
    const { userInfo = null } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const corpPositions = useCorpPositionList(corpID);
    const [positionDTO, setPositionDTO] = useState<CorpPositionInfoData>();
    const corpPositionColumns: ColDef<CorpPositionInfoData>[] = useMemo<ColDef<CorpPositionInfoData>[]>(() => [
        {
            headerName: 'Position',
            field: 'name',
            flex: 1,
            editable: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            flex: 1,
            editable: true,
            cellRenderer: (props: { value: string }) => <>${props.value}</>,
        },
        {
            headerName: 'Uniform',
            flex: 1,
            editable: true,
            cellRenderer: (props: { data: CorpPositionInfoData }) => (
                <LayoutAvatarImageView className="avatar" figure={corpChangeClothes(roleplayStats.figure, props.data.maleUniform)} direction={2} style={{ marginTop: -30 }} />
            )
        },
        {
            headerName: 'Tools',
            flex: 1,
            editable: true,
            cellRenderer: (props: { data: CorpPositionInfoData }) => (
                <Button size="sm" style={{ width: '100%' }} type="button" variant="success" onClick={() => setPositionDTO(props.data)}>
                    View
                </Button>
            )
        },
    ], [roleplayStats]);

    const PERM_KEYS: Array<keyof CorpPositionInfoData> = ['canHire', 'canFire', 'canPromote', 'canDemote', 'canWorkAnywhere'];

    function onTogglePerm<K extends keyof CorpPositionInfoData>(key: K) {
        setPositionDTO(_ => ({
            ..._,
            [key]: !_[key],
        }))
    }

    function onAddPosition() {

    }

    function onSavePosition() {

    }

    return (
        <Grid fullHeight={false} style={{ padding: 16 }}>
            <Column center size={12}>
                <Grid center fullWidth>
                    <Column center size={6} alignItems="start">
                        <Text bold fontSize={6}>
                            {positionDTO && <FaCaretLeft size={24} style={{ cursor: 'pointer' }} onClick={() => setPositionDTO(null)} />}
                            {positionDTO ? 'Editing Position' : `Positions (${corpPositions.length})`}
                        </Text>
                    </Column>
                    <Column center size={6} alignItems="end">
                        <Button size="sm" type="button" variant="success" onClick={onSavePosition}>
                            <FaPlusCircle style={{ marginRight: 8 }} />
                            Add
                        </Button>
                    </Column>
                </Grid>
            </Column>
            <Column center size={12}>
                {
                    positionDTO
                        ? (
                            <Grid fullHeight fullWidth>
                                <Column size={6}>
                                    <Flex alignItems="center" gap={2}>
                                        <Text bold center className="col-2">Name</Text>
                                        <input type="text" className="form-control form-control-sm" value={positionDTO.name} maxLength={29} onChange={event => console.log(event.target.value)} />
                                    </Flex>
                                    <Flex alignItems="center" gap={2}>
                                        <Text bold center className="col-2">Motto</Text>
                                        <input type="text" className="form-control form-control-sm" value={positionDTO.motto} maxLength={29} onChange={event => console.log(event.target.value)} />
                                    </Flex>
                                    <Flex alignItems="center" gap={2}>
                                        <Text bold center className="col-2">Salary</Text>
                                        <input type="number" className="form-control form-control-sm" value={positionDTO.salary} maxLength={29} onChange={event => console.log(event.target.value)} />
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
                                        <Button style={{ width: '100%' }} size="sm" type="button" variant="secondary" onClick={onSavePosition}>
                                            Change Uniform
                                        </Button>
                                        <Button style={{ width: '100%' }} size="sm" type="button" variant="danger" onClick={onSavePosition}>
                                            Delete
                                        </Button>
                                    </Flex>
                                </Column>
                            </Grid>
                        )
                        : (
                            <div className="ag-theme-quartz-dark" style={{ width: 550, height: 300 }}>
                                <AgGridReact rowHeight={50} rowData={corpPositions} columnDefs={corpPositionColumns} />
                            </div>
                        )
                }
            </Column>
        </Grid>
    )
}