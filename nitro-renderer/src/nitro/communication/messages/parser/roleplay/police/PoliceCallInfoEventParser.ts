import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface PoliceCallData {
    reportedByUserID: number;
    reportedByUsername: string;
    reportedByFigure: string;
    roomID: number;
    message: string;
    callId: number;
    maxCallId: number;
}

export class PoliceCallInfoEventParser implements IMessageParser {
    private _reportedByUserID: number;
    private _reportedByUsername: string;
    private _reportedByFigure: string;
    private _roomID: number;
    private _message: string;
    private _callId: number;
    private _maxCallId: number;

    public flush(): boolean {
        this._reportedByUserID = -1;
        this._reportedByUsername = '';
        this._reportedByFigure = '-';
        this._roomID = -1;
        this._message = '';
        this._callId = -1;
        this._maxCallId = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false

        this._reportedByUserID = wrapper.readInt();
        this._reportedByUsername = wrapper.readString();
        this._reportedByFigure = wrapper.readString();
        this._roomID = wrapper.readInt();
        this._message = wrapper.readString();
        this._callId = wrapper.readInt();
        this._maxCallId = wrapper.readInt();
        return true;
    }

    public get policeCall(): PoliceCallData {
        return {
            reportedByUserID: this._reportedByUserID,
            reportedByUsername: this._reportedByUsername,
            reportedByFigure: this._reportedByFigure,
            roomID: this._roomID,
            message: this._message,
            callId: this._callId,
            maxCallId: this._maxCallId
        }
    }

}
