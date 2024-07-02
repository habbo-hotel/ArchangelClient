import { useEffect, useMemo, useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { useMessageEvent, useSessionInfo } from "../../../../../hooks";
import { CorpPositionInfoData, CorpPositionListData, CorpPositionListEvent } from "@nitro-rp/renderer";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { corpChangeClothes } from "../../../../../api/roleplay/corp/CorpChangeClothes";
import { FaCaretLeft, FaPlusCircle, FaShieldAlt, FaTimesCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { CorpPositionEditor } from "./corp-editor/CorpPositionEditor";
import { CorpEditPosition } from "../../../../../api/roleplay/corp/CorpEditPosition";
import { CorpCreatePosition } from "../../../../../api/roleplay/corp/CorpCreatePosition";
import { CorpPositionList } from "../../../../../api/roleplay/corp/CorpPositionList";
import { CorpDeletePosition } from "../../../../../api/roleplay/corp/CorpDeletePosition";

export function CorpPositions({ corpID }: CorpManagerViewProps) {
    const { userInfo = null } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const [corpPositions, setCorpPositions] = useState<CorpPositionListData[]>([]);
    const [creating, setCreating] = useState(false);
    const [editingPosition, setEditingPosition] = useState<CorpPositionListData>();
    const corpPositionColumns: ColDef<CorpPositionListData>[] = useMemo<ColDef<CorpPositionListData>[]>(() => [
        {
            headerName: 'Position',
            field: 'name',
            flex: 1,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            flex: 1,
            cellRenderer: (props: { value: string }) => <>${props.value}</>,
        },
        {
            field: 'maleFigure',
            headerName: 'Uniform',
            flex: 1,
            cellRenderer: (props: { data: CorpPositionListData }) => (
                <LayoutAvatarImageView className="avatar" figure={corpChangeClothes(roleplayStats.figure, props.data.maleFigure)} direction={2} style={{ marginTop: -30 }} />
            )
        },
        {
            headerName: 'Tools',
            flex: 1,
            cellRenderer: (props: { data: CorpPositionListData }) => (
                <Button size="sm" style={{ width: '100%' }} type="button" variant="success" onClick={() => setEditingPosition(props.data)}>
                    View
                </Button>
            )
        },
    ], [roleplayStats]);

    useEffect(() => {
        setCorpPositions([]);
        CorpPositionList(corpID);
    }, [corpID]);

    useMessageEvent<CorpPositionListEvent>(CorpPositionListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        setCorpPositions(parser.corpPositions)
    });

    function onCreate(corpPositionDTO: Omit<CorpPositionInfoData, 'id'>) {
        CorpCreatePosition(corpID, corpPositionDTO.orderID, corpPositionDTO.name, corpPositionDTO.motto, corpPositionDTO.salary, corpPositionDTO.maleUniform, corpPositionDTO.femaleUniform, corpPositionDTO.canHire, corpPositionDTO.canFire, corpPositionDTO.canPromote, corpPositionDTO.canDemote, corpPositionDTO.canWorkAnywhere);
        setCreating(false);
    }

    function onUpdate(corpPositionDTO: Omit<CorpPositionInfoData, 'id'>) {
        CorpEditPosition(corpID, editingPosition.id, corpPositionDTO.name, corpPositionDTO.motto, corpPositionDTO.salary, corpPositionDTO.maleUniform, corpPositionDTO.femaleUniform, corpPositionDTO.canHire, corpPositionDTO.canFire, corpPositionDTO.canPromote, corpPositionDTO.canDemote, corpPositionDTO.canWorkAnywhere);
        setEditingPosition(null);
    }

    function onDeletePosition() {
        CorpDeletePosition(corpID, editingPosition.id);
        setEditingPosition(null);
    }

    const [btnLabel, btnAction, btnColor] = !creating && !editingPosition
        ? [
            <>
                <FaPlusCircle style={{ marginRight: 8 }} />
                {editingPosition ? 'Edit' : 'Create'}
            </>,
            () => setCreating(true),
            'success'
        ]
        : [
            <>
                <FaTimesCircle style={{ marginRight: 8 }} />
                Cancel
            </>,
            () => editingPosition ? setEditingPosition(null) : setCreating(false),
            'danger'
        ]

    return (
        <Grid fullHeight={false} style={{ padding: 16 }}>
            <Column center size={12}>
                <Grid center fullWidth>
                    <Column center size={6} alignItems="start">
                        <Text bold fontSize={5}>
                            <FaShieldAlt size={24} style={{ marginRight: 8 }} />
                            {creating ? 'New Position' : editingPosition ? 'Edit Position' : `Positions (${corpPositions.length})`}
                        </Text>
                    </Column>
                    <Column center size={6} alignItems="end">
                        <Button size="sm" type="button" variant={btnColor} onClick={btnAction}>
                            {btnLabel}
                        </Button>
                    </Column>
                </Grid>
            </Column>
            <Column center size={12}>
                {
                    creating
                        ? <CorpPositionEditor corpID={corpID} onSave={onCreate} />
                        : editingPosition
                            ? <CorpPositionEditor corpID={corpID} corpPositionID={editingPosition?.id} onSave={onUpdate}>
                                <Button style={{ width: '100%' }} size="sm" type="button" variant="danger" onClick={onDeletePosition}>
                                    Delete
                                </Button>
                            </CorpPositionEditor>
                            : (
                                <div className="ag-theme-quartz-dark" style={{ width: 550, height: 300 }}>
                                    <AgGridReact rowHeight={50} rowData={corpPositions} columnDefs={corpPositionColumns} suppressCellFocus />
                                </div>
                            )
                }
            </Column>
        </Grid>
    )
}