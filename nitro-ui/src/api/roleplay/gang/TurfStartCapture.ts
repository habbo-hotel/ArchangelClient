import { TurfStartCaptureComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function TurfStartCapture(): void {
    SendMessageComposer(new TurfStartCaptureComposer());
}
