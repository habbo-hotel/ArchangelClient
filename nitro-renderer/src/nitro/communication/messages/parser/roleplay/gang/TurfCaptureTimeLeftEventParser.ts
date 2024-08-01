import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface TurfCaptureTimeLeftData {
    secondsLeft: number;
    isCapturing: boolean;
    gangs: Array<{ gangId: number; userCount: number; }>
}

export class TurfCaptureTimeLeftEventParser implements IMessageParser {
    private _secondsLeft: number;
    private _isCapturing: boolean;
    private _gangs: Array<{ gangId: number; userCount: number; }>;

    public flush(): boolean {
        this._secondsLeft = -1;
        this._isCapturing = false;
        this._gangs = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;
        this._secondsLeft = wrapper.readInt();
        this._isCapturing = wrapper.readBoolean();

        const gangs: Array<{ gangId: number; userCount: number; }> = [];
        const gangCount = wrapper.readInt();

        for (let i = 0; i < gangCount; i++) {
            const [gangId, userCount] = wrapper.readString().split(';').map(Number);
            gangs.push({ gangId, userCount });
        }

        this._gangs = gangs;

        return true;
    }

    public get data(): TurfCaptureTimeLeftData {
        return {
            secondsLeft: this._secondsLeft,
            isCapturing: this._isCapturing,
            gangs: this._gangs,
        }
    }
}
