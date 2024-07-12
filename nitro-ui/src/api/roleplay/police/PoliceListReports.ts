import { PoliceListReportsComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function PoliceListReports(): void {
    SendMessageComposer(new PoliceListReportsComposer());
}
