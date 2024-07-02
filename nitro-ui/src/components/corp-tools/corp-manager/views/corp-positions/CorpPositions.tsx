import { useEffect, useMemo, useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { useMessageEvent, useSessionInfo } from "../../../../../hooks";
import { CorpPositionInfoData, CorpPositionInfoQueryEvent, CorpPositionListEvent } from "@nitro-rp/renderer";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { corpChangeClothes } from "../../../../../api/roleplay/corp/CorpChangeClothes";
import { FaCaretLeft, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { CorpPositionEditor } from "./corp-editor/CorpPositionEditor";
import { CorpEditPosition } from "../../../../../api/roleplay/corp/CorpEditPosition";
import { CorpCreatePosition } from "../../../../../api/roleplay/corp/CorpCreatePosition";
import { CorpPositionList } from "../../../../../api/roleplay/corp/CorpPositionList";
import { CorpPositionInfoQuery } from "../../../../../api/roleplay/corp/CorpPositionInfoQuery";
import { CorpDeletePosition } from "../../../../../api/roleplay/corp/CorpDeletePosition";

export function CorpPositions({ corpID }: CorpManagerViewProps) {
    const { userInfo = null } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const [corpPositions, setCorpPositions] = useState<CorpPositionInfoData[]>([]);
    const [creating, setCreating] = useState(false);
    const [editingPosition, setEditingPosition] = useState<CorpPositionInfoData>();
    const corpPositionColumns: ColDef<CorpPositionInfoData>[] = useMemo<ColDef<CorpPositionInfoData>[]>(() => [
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
            headerName: 'Uniform',
            flex: 1,
            cellRenderer: (props: { data: CorpPositionInfoData }) => (
                <LayoutAvatarImageView className="avatar" figure={corpChangeClothes(roleplayStats.figure, props.data.maleUniform)} direction={2} style={{ marginTop: -30 }} />
            )
        },
        {
            headerName: 'Tools',
            flex: 1,
            cellRenderer: (props: { data: CorpPositionInfoData }) => (
                <Button size="sm" style={{ width: '100%' }} type="button" variant="success" onClick={() => setEditingPosition(props.data)}>
                    View
                </Button>
            )
        },
    ], [roleplayStats]);

    useEffect(() => {
        setCorpPositions([]);
        CorpPositionList(corpID);
    }, [corpID, creating, editingPosition]);

    useMessageEvent<CorpPositionListEvent>(CorpPositionListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        for (const positionID of parser.corpPositionIDs) {
            CorpPositionInfoQuery(corpID, positionID);
        }
    });


    useMessageEvent<CorpPositionInfoQueryEvent>(CorpPositionInfoQueryEvent, event => {
        const parser = event.getParser();
        if (parser.data.corpID !== corpID) {
            return;
        }
        setCorpPositions(_ => {
            const newPositions = [..._];

            const positionIndex = newPositions.findIndex(_ => _.id === parser.data.id);

            if (positionIndex === -1) {
                newPositions.push(parser.data);
                return newPositions;
            }

            newPositions[positionIndex] = parser.data;
            return newPositions;
        })
    })

    function onCreate(corpPositionDTO: Omit<CorpPositionInfoData, 'id'>) {
        CorpCreatePosition(corpID, corpPositionDTO.name, corpPositionDTO.motto, corpPositionDTO.salary, corpPositionDTO.orderID, corpPositionDTO.maleUniform, corpPositionDTO.femaleUniform, corpPositionDTO.canHire, corpPositionDTO.canFire, corpPositionDTO.canPromote, corpPositionDTO.canDemote, corpPositionDTO.canWorkAnywhere);
        setCreating(false);
    }

    function onUpdate(corpPositionDTO: Omit<CorpPositionInfoData, 'id'>) {
        CorpEditPosition(corpID, editingPosition.id, corpPositionDTO.name, corpPositionDTO.motto, corpPositionDTO.salary, corpPositionDTO.maleUniform, corpPositionDTO.femaleUniform);
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
                        <Text bold fontSize={6}>
                            {editingPosition && <FaCaretLeft size={24} style={{ cursor: 'pointer' }} onClick={() => setEditingPosition(null)} />}
                            {editingPosition ? 'Editing Position' : `Positions (${corpPositions.length})`}
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
                            ? <CorpPositionEditor corpID={corpID} defaultCorpPosition={editingPosition} onSave={onUpdate}>
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