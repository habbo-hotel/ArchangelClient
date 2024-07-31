import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface TurfCaptureTimeLeftData {
    userId: number;
    username: string;
    figure: string;
    secondsLeft: number;
    isCapturing: boolean;
}

export class TurfCaptureTimeLeftEventParser implements IMessageParser {
    private _userId: number;
    private _username: string;
    private _figure: string;
    private _secondsLeft: number;
    private _isCapturing: boolean;

    public flush(): boolean {
        this._userId = -1;
        this._username = '';
        this._figure = '-';
        this._secondsLeft = -1;
        this._isCapturing = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._userId = wrapper.readInt();
        this._username = wrapper.readString();
        this._figure = wrapper.readString();
        this._secondsLeft = wrapper.readInt();
        this._isCapturing = wrapper.readBoolean();
        return true;
    }

    public get data(): TurfCaptureTimeLeftData {
        return {
            userId: this._userId,
            username: this._username,
            figure: this._figure,
            secondsLeft: this._secondsLeft,
            isCapturing: this._isCapturing,
        }
    }
}
