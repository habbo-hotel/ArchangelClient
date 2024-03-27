import { IRoomObjectController, IRoomObjectEventHandler, IRoomObjectModel, IRoomObjectMouseHandler, IRoomObjectUpdateMessage, IRoomObjectVisualization, IVector3D } from '../../api';
import { Disposable } from '../../core';
export declare class RoomObject extends Disposable implements IRoomObjectController {
    private static OBJECT_COUNTER;
    private _id;
    private _instanceId;
    private _type;
    private _model;
    private _location;
    private _direction;
    private _states;
    private _visualization;
    private _logic;
    private _pendingLogicMessages;
    private _updateCounter;
    private _isReady;
    constructor(id: number, stateCount: number, type: string);
    protected onDispose(): void;
    getLocation(): IVector3D;
    setLocation(vector: IVector3D): void;
    getDirection(): IVector3D;
    setDirection(vector: IVector3D): void;
    getState(index?: number): number;
    setState(state: number, index?: number): boolean;
    setVisualization(visualization: IRoomObjectVisualization): void;
    setLogic(logic: IRoomObjectEventHandler): void;
    processUpdateMessage(message: IRoomObjectUpdateMessage): void;
    tearDown(): void;
    get id(): number;
    get instanceId(): number;
    get type(): string;
    get model(): IRoomObjectModel;
    get visualization(): IRoomObjectVisualization;
    get mouseHandler(): IRoomObjectMouseHandler;
    get logic(): IRoomObjectEventHandler;
    get location(): IVector3D;
    get direction(): IVector3D;
    get updateCounter(): number;
    set updateCounter(count: number);
    get isReady(): boolean;
    set isReady(flag: boolean);
}
