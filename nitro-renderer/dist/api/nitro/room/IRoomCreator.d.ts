import { IRoomInstance, IRoomObjectController, IVector3D } from '../../room';
import { IRoomSessionManager, ISessionDataManager } from '../session';
import { IObjectData, IRoomMapData } from './object';
import { IFurnitureStackingHeightMap, ILegacyWallGeometry } from './utils';
export interface IRoomCreator {
    destroyRoom(id: number): void;
    getRoomInstance(roomId: number): IRoomInstance;
    updateRoomInstancePlaneVisibility(roomId: number, wallVisible: boolean, floorVisible?: boolean): boolean;
    updateRoomInstancePlaneThickness(roomId: number, wallThickness: number, floorThickness: number): boolean;
    updateRoomInstancePlaneType(roomId: number, floorType?: string, wallType?: string, landscapeType?: string, _arg_5?: boolean): boolean;
    removeRoomInstance(roomId: number): void;
    createRoomInstance(roomId: number, roomMap: IRoomMapData): void;
    setRoomSessionOwnUser(roomId: number, objectId: number): void;
    setRoomInstanceModelName(roomId: number, name: string): void;
    getFurnitureStackingHeightMap(roomId: number): IFurnitureStackingHeightMap;
    setFurnitureStackingHeightMap(roomId: number, heightMap: IFurnitureStackingHeightMap): void;
    getLegacyWallGeometry(roomId: number): ILegacyWallGeometry;
    getRoomObject(roomId: number, objectId: number, category: number): IRoomObjectController;
    getRoomObjectByIndex(roomId: number, index: number, category: number): IRoomObjectController;
    getRoomObjectCursor(roomId: number): IRoomObjectController;
    getRoomObjectUser(roomId: number, objectId: number): IRoomObjectController;
    removeRoomObjectUser(roomId: number, objectId: number): void;
    getRoomObjectFloor(roomId: number, objectId: number): IRoomObjectController;
    addFurnitureFloor(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra?: number, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, synchronized?: boolean, realRoomObject?: boolean, sizeZ?: number): boolean;
    addFurnitureFloorByTypeName(roomId: number, id: number, typeName: string, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra?: number, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, synchronized?: boolean, realRoomObject?: boolean, sizeZ?: number): boolean;
    addFurnitureWall(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, extra: string, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, realRoomObject?: boolean): boolean;
    removeRoomObjectFloor(roomId: number, objectId: number, userId?: number, _arg_4?: boolean): void;
    removeRoomObjectWall(roomId: number, objectId: number, userId?: number): void;
    updateRoomObjectFloor(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, state: number, data: IObjectData, extra?: number): boolean;
    updateRoomObjectWall(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, state: number, extra?: string): boolean;
    updateRoomObjectWallItemData(roomId: number, objectId: number, data: string): boolean;
    updateRoomObjectFloorHeight(roomId: number, objectId: number, height: number): boolean;
    updateRoomObjectFloorExpiration(roomId: number, objectId: number, expires: number): boolean;
    updateRoomObjectWallExpiration(roomId: number, objectId: number, expires: number): boolean;
    rollRoomObjectFloor(roomId: number, objectId: number, location: IVector3D, targetLocation: IVector3D): void;
    addRoomObjectUser(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, headDirection: number, type: number, figure: string): boolean;
    updateRoomObjectUserLocation(roomId: number, objectId: number, location: IVector3D, targetLocation: IVector3D, canStandUp?: boolean, baseY?: number, direction?: IVector3D, headDirection?: number): boolean;
    updateRoomObjectUserAction(roomId: number, objectId: number, action: string, value: number, parameter?: string): boolean;
    updateRoomObjectUserFigure(roomId: number, objectId: number, figure: string, gender?: string, subType?: string, isRiding?: boolean): boolean;
    updateRoomObjectUserFlatControl(roomId: number, objectId: number, level: string): boolean;
    updateRoomObjectUserEffect(roomId: number, objectId: number, effectId: number, delay?: number): boolean;
    updateRoomObjectUserGesture(roomId: number, objectId: number, gestureId: number): boolean;
    updateRoomObjectUserPetGesture(roomId: number, objectId: number, gesture: string): boolean;
    updateRoomObjectUserPosture(roomId: number, objectId: number, type: string, parameter?: string): boolean;
    updateRoomObjectUserOwn(roomId: number, objectId: number): void;
    getPetTypeId(figure: string): number;
    refreshTileObjectMap(k: number, _arg_2: string): void;
    setRoomEngineGameMode(roomId: number, isPlaying: boolean): void;
    sessionDataManager: ISessionDataManager;
    roomSessionManager: IRoomSessionManager;
}
