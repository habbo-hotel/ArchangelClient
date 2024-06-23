import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export enum CorpType {
    CIVILIAN = "civilian",
    POLICE = "gov_police",
    WELFARE = "gov_welfare",
    HOSPITAL = "gov_hospital",
    MINING_AUTHORITY = "gov_mining",
    DRIVING_AUTHORITY = "gov_driver",
    WEAPONS_AUTHORITY = "gov_weapons",
    FARMING_AUTHORITY = "gov_farming",
    FISHING_AUTHORITY = "gov_fishing",
}

export interface CorpInfoData {
    id: number;
    userID: number;
    roomID: number;
    name: string;
    description: string;
    badgeCode: string;
    tags: string[];
}

export class CorpInfoParser implements IMessageParser {
    private _id: number;
    private _userID: number;
    private _roomID: number;
    private _name: string;
    private _description: string;
    private _badgeCode: string;
    private _tags: string[];

    public flush(): boolean {
        this._id = 0;
        this._userID = 0;
        this._roomID = 0;
        this._name = '';
        this._description = '';
        this._badgeCode = '';
        this._tags = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._userID = wrapper.readInt();
        this._roomID = wrapper.readInt();
        this._name = wrapper.readString();
        this._description = wrapper.readString();
        this._badgeCode = wrapper.readString();
        this._tags = wrapper.readString().split(',');

        return true;
    }

    public get data(): CorpInfoData {
        return {
            id: this._id,
            userID: this._userID,
            roomID: this._roomID,
            name: this._name,
            description: this._description,
            badgeCode: this._badgeCode,
            tags: this._tags,
        }
    }
}
