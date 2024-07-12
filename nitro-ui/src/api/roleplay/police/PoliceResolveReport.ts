import { PoliceResolveReportComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function PoliceResolveReport(reportID: number): void {
    SendMessageComposer(new PoliceResolveReportComposer(reportID));
}
