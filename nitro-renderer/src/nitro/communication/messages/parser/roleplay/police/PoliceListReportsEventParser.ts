import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface PoliceReportData {
    reportedByUserID: number;
    reportedByUsername: string;
    reportedByFigure: string;
    roomID: number;
    message: string;
    resolved: boolean;
    resolvedByUserID?: number;
    resolvedByUsername?: string;
    resolvedByFigure?: string;
}

export class PoliceListReportsEventParser implements IMessageParser {
    private _policeReports: Array<PoliceReportData> = [];

    public flush(): boolean {
        this._policeReports = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalReports = wrapper.readInt();

        for (let i = 0; i < totalReports; i++) {
            const [reportedByUserID, reportedByUsername, reportedByFigure, roomID, message, resolved, resolvedByUserID, resolvedByUsername, resolvedByFigure] = wrapper.readString().split(';');
            this._policeReports.push({ reportedByUserID: Number(reportedByUserID), reportedByUsername, reportedByFigure, roomID: Number(roomID), message, resolved: Boolean(resolved), resolvedByUserID: Number(resolvedByUserID), resolvedByUsername, resolvedByFigure });
        }

        return true;
    }

    public get policeReports(): Array<PoliceReportData> {
        return this._policeReports;
    }

}
