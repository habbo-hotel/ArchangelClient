import { useMemo, useState } from "react";
import { Column, Grid, LayoutAvatarImageView, Text } from "../../../../../common";
import { CorpManagerViewProps } from "../../CorpManager";
import { useSessionInfo } from "../../../../../hooks";
import { CorpEmployeeData } from "@nitro-rp/renderer";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import { CorpEmployeeList } from "../../../../../api/roleplay/corp/CorpEmployeeList";
import { FaCaretDown, FaCaretLeft, FaCaretUp, FaPlusCircle, FaTimesCircle, FaUsers } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { CorpFireUser } from "../../../../../api/roleplay/corp/CorpFireUser";
import { CorpPromoteUser } from "../../../../../api/roleplay/corp/CorpPromoteUser";
import { CorpDemoteUser } from "../../../../../api/roleplay/corp/CorpDemoteUser";
import { UserSelect } from "../../../../roleplay/UserSelect";
import { useCorpEmployeeList } from "../../../../../hooks/roleplay/use-corp-employee-list";
import { CorpHireEmployee } from "./CorpHireEmployee";

export function CorpEmployees({ corpID }: CorpManagerViewProps) {
    const { userInfo } = useSessionInfo();
    const [hiringMode, setHiringMode] = useState(false);
    const corpEmployees = useCorpEmployeeList(corpID);
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
            cellRenderer: ({ data }: { data: CorpEmployeeData }) => {
                if (data.userID === userInfo?.userId) {
                    return null;
                }

                return (
                    <Grid fullHeight={false} gap={2} alignItems="center" style={{ marginTop: 8 }}>
                        <Button size="sm" type="button" variant="secondary" onClick={() => onDemoteUser(data.username)}>
                            <FaCaretDown />
                        </Button>
                        <Button size="sm" type="button" variant="success" onClick={() => onPromoteUser(data.username)}>
                            <FaCaretUp />
                        </Button>

                        <Button size="sm" type="button" variant="danger" onClick={() => onFireUser(data.username)}>
                            <FaTimesCircle />
                        </Button>
                    </Grid>
                )
            },
        },
    ], []);

    function onToggleHiringMode() {
        setHiringMode(_ => !_);
    }

    function onDemoteUser(username: string) {
        CorpDemoteUser(username);
        CorpEmployeeList(corpID);
    }

    function onPromoteUser(username: string) {
        CorpPromoteUser(username);
        CorpEmployeeList(corpID);
    }

    function onFireUser(username: string) {
        CorpFireUser(username);
        CorpEmployeeList(corpID);
    }

    if (hiringMode) {
        return <CorpHireEmployee corpID={corpID} onToggle={onToggleHiringMode} />
    }

    return (
        <Grid fullHeight={false} style={{ padding: 16 }}>
            <Column size={12}>
                <Grid>
                    <Column center size={6} alignItems="start">
                        <Text bold fontSize={5}>
                            <FaUsers size={24} style={{ marginRight: 8 }} />
                            Employees ({corpEmployees.length})
                        </Text>
                    </Column>
                    <Column center size={6} alignItems="end">
                        <Button size="sm" type="button" variant="success" onClick={onToggleHiringMode}>
                            <FaPlusCircle style={{ marginRight: 8 }} />
                            Add
                        </Button>
                    </Column>
                </Grid>
            </Column>
            <Column center size={12}>
                <div className="ag-theme-quartz-dark" style={{ width: 550, height: 300 }}>
                    <AgGridReact rowHeight={50} rowData={corpEmployees} columnDefs={corpPositionColumns} suppressCellFocus />
                </div>
            </Column>
        </Grid>
    )
}