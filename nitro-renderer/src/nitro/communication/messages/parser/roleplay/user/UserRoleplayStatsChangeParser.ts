import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface UserRoleplayStatsChangeData {
    userID: number;
    username: string;
    figure: string;
    cashBalance: number;
    bankBalance: number;
    isDead: boolean;
    isStunned: boolean;
    isCuffed: boolean;
    escortedByUserID: number;
    healthNow: number;
    healthMax: number;
    energyNow: number;
    energyMax: number;
    hungerNow: number;
    hungerMax: number;
    equippedWeaponID?: number;
    equippedWeaponAmmoLeft?: number;
    corporationID: number;
    corporationPositionID: number;
    isWorking: boolean;
    gangID: number;
}


export class UserRoleplayStatsChangeParser implements IMessageParser {
    private _userID: number;
    private _username: string;
    private _figure: string;
    private _cashBalance: number;
    private _bankBalance: number;
    private _isDead: boolean;
    private _isStunned: boolean;
    private _isCuffed: boolean;
    private _isWorking: boolean;
    private _escortedByUserID: number;
    private _healthNow: number;
    private _healthMax: number;
    private _energyNow: number;
    private _energyMax: number;
    private _hungerNow: number;
    private _hungerMax: number;
    private _equippedWeaponID?: number;
    private _equippedWeaponAmmoLeft?: number;
    private _corporationID: number;
    private _corporationPositionID: number;
    private _gangID?: number;

    public flush(): boolean {
        this._userID = 0;
        this._username = '';
        this._figure = '';
        this._cashBalance = 0;
        this._bankBalance = 0;
        this._isDead = false;
        this._isStunned = false;
        this._isCuffed = false;
        this._isWorking = false;
        this._escortedByUserID = 0;
        this._healthNow = 0;
        this._healthMax = 0;
        this._energyNow = 0;
        this._energyMax = 0;
        this._hungerNow = 0;
        this._hungerMax = 0;
        this._equippedWeaponID = 0;
        this._equippedWeaponAmmoLeft = 0;
        this._corporationID = 0;
        this._corporationPositionID = 0;
        this._gangID = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._userID = wrapper.readInt();
        this._username = wrapper.readString();
        this._figure = wrapper.readString();
        this._cashBalance = wrapper.readInt();
        this._bankBalance = wrapper.readInt();
        this._isDead = wrapper.readBoolean();
        this._isStunned = wrapper.readBoolean();
        this._isCuffed = wrapper.readBoolean();
        this._isWorking = wrapper.readBoolean();
        this._escortedByUserID = wrapper.readInt();
        this._healthNow = wrapper.readInt();
        this._healthMax = wrapper.readInt();
        this._energyNow = wrapper.readInt();
        this._energyMax = wrapper.readInt();
        this._hungerNow = wrapper.readInt();
        this._hungerMax = wrapper.readInt();
        this._equippedWeaponID = wrapper.readInt();
        this._equippedWeaponAmmoLeft = wrapper.readInt();
        this._corporationID = wrapper.readInt();
        this._corporationPositionID = wrapper.readInt();
        this._gangID = wrapper.readInt();

        return true;
    }

    public get data(): UserRoleplayStatsChangeData {
        return {
            userID: this._userID,
            username: this._username,
            figure: this._figure,
            cashBalance: this._cashBalance,
            bankBalance: this._bankBalance,
            isDead: this._isDead,
            isStunned: this._isStunned,
            isCuffed: this._isCuffed,
            isWorking: this._isWorking,
            escortedByUserID: this._escortedByUserID,
            healthNow: this._healthNow,
            healthMax: this._healthMax,
            energyNow: this._energyNow,
            energyMax: this._energyMax,
            hungerNow: this._hungerNow,
            hungerMax: this._hungerMax,
            equippedWeaponID: this._equippedWeaponID,
            equippedWeaponAmmoLeft: this._equippedWeaponAmmoLeft,
            corporationID: this._corporationID,
            corporationPositionID: this._corporationPositionID,
            gangID: this._gangID,
        }
    }
}
