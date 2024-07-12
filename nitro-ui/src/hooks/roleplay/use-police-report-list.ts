import { PoliceListReportsEvent, PoliceReportData } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { PoliceListReports } from "../../api/roleplay/police/PoliceListReports";

export function usePoliceReportList(): Array<PoliceReportData> {
    const [reports, setReports] = useState<PoliceReportData[]>([]);

    useEffect(() => {
        PoliceListReports();
    }, []);

    useMessageEvent<PoliceListReportsEvent>(PoliceListReportsEvent, event => {
        const parser = event.getParser();
        setReports(parser.policeReports);
    });

    return reports;
}