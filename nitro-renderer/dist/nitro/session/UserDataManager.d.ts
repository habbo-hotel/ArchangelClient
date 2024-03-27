import { IConnection, IRoomUserData } from '../../api';
import { Disposable } from '../../core';
export declare class UserDataManager extends Disposable {
    private static TYPE_USER;
    private static TYPE_PET;
    private static TYPE_BOT;
    private static TYPE_RENTABLE_BOT;
    private _connection;
    private _userDataByType;
    private _userDataByRoomIndex;
    private _userBadges;
    constructor();
    protected onDispose(): void;
    setConnection(connection: IConnection): void;
    getUserData(webID: number): IRoomUserData;
    getPetData(webID: number): IRoomUserData;
    getBotData(webID: number): IRoomUserData;
    getRentableBotData(webID: number): IRoomUserData;
    getDataByType(webID: number, type: number): IRoomUserData;
    getUserDataByIndex(roomIndex: number): IRoomUserData;
    getUserDataByName(name: string): IRoomUserData;
    updateUserData(data: IRoomUserData): void;
    removeUserData(roomIndex: number): void;
    getUserBadges(userId: number): string[];
    setUserBadges(userId: number, badges: string[]): void;
    updateFigure(roomIndex: number, figure: string, sex: string, hasSaddle: boolean, isRiding: boolean): void;
    updateName(roomIndex: number, name: string): void;
    updateMotto(roomIndex: number, custom: string): void;
    updateAchievementScore(roomIndex: number, score: number): void;
    updatePetLevel(roomIndex: number, level: number): void;
    updatePetBreedingStatus(roomIndex: number, canBreed: boolean, canHarvest: boolean, canRevive: boolean, hasBreedingPermission: boolean): void;
    requestPetInfo(id: number): void;
    get connection(): IConnection;
}
