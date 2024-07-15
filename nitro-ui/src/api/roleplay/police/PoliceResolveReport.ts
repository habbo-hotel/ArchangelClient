import { PoliceResolveReportComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function PoliceResolveReport(reportID: number, flagged: boolean): void {
    SendMessageComposer(new PoliceResolveReportComposer(reportID, flagged));
}
