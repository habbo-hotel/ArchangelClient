import { useEffect, useMemo, useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { useMessageEvent } from "../../../../../hooks";
import { CorpEmployeeData, CorpEmployeeListEvent } from "@nitro-rp/renderer";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import { CorpEmployeeList } from "../../../../../api/roleplay/corp/CorpEmployeeList";
import { FaCaretDown, FaCaretUp, FaTimesCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";

export function CorpEmployees({ corpID }: CorpManagerViewProps) {
    const [corpEmployees, setCorpEmployees] = useState<CorpEmployeeData[]>([]);
    const corpPositionColumns = useMemo<ColDef<CorpEmployeeData>[]>(() => [
        {
            headerName: '',
            field: 'figure',
            flex: 1,
            cellRenderer: ({ value }: { value: string }) => <LayoutAvatarImageView className="avatar" figure={value} direction={2} style={{ marginTop: -30 }} />
        },
        {
            headerName: 'Employee',
            field: 'username',
            flex: 1,
        },
        {
            headerName: 'Position',
            field: 'corpPositionName',
            flex: 1,
        },
        {
            headerName: 'Tools',
            flex: 1,
            cellRenderer: ({ data }: { data: CorpEmployeeData }) => (
                <Grid fullHeight={false} gap={2} alignItems="center" style={{ marginTop: 8 }}>
                    <Button size="sm" type="button" variant="secondary">
                        <FaCaretDown />
                    </Button>
                    <Button size="sm" type="button" variant="success">
                        <FaCaretUp />
                    </Button>

                    <Button size="sm" type="button" variant="danger">
                        <FaTimesCircle />
                    </Button>
                </Grid>
            ),
        },
    ], []);

    useEffect(() => {
        CorpEmployeeList(corpID);
    }, [corpID]);

    useMessageEvent<CorpEmployeeListEvent>(CorpEmployeeListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        setCorpEmployees(parser.corpEmployees);
    })
    return (
        <Grid fullHeight={false} style={{ padding: 16 }}>
            <Column center size={12} alignItems="start">
                <Text bold fontSize={6}>
                    Employees ({corpEmployees.length})
                </Text>
            </Column>
            <Column center size={12}>
                <div className="ag-theme-quartz-dark" style={{ width: 550, height: 300 }}>
                    <AgGridReact rowHeight={50} rowData={corpEmployees} columnDefs={corpPositionColumns} />
                </div>
            </Column>
        </Grid>
    )
}