import { Resource, Texture } from '@pixi/core';
import { IAvatarEffectListener, IAvatarImageListener, IObjectVisualizationData, IRoomGeometry, IRoomObject, IRoomObjectModel } from '../../../../../api';
import { RoomObjectSpriteVisualization } from '../../../../../room';
import { AvatarVisualizationData } from './AvatarVisualizationData';
export declare class AvatarVisualization extends RoomObjectSpriteVisualization implements IAvatarImageListener, IAvatarEffectListener {
    private static AVATAR;
    private static FLOATING_IDLE_Z_ID;
    private static TYPING_BUBBLE_ID;
    private static EXPRESSION_ID;
    private static NUMBER_BUBBLE_ID;
    private static GAME_CLICK_TARGET_ID;
    private static MUTED_BUBBLE_ID;
    private static GUIDE_BUBBLE_ID;
    private static OWN_USER_ID;
    private static UPDATE_TIME_INCREASER;
    private static AVATAR_LAYER_ID;
    private static SHADOW_LAYER_ID;
    private static SNOWBOARDING_EFFECT;
    private static INITIAL_RESERVED_SPRITES;
    private static ANIMATION_FRAME_UPDATE_INTERVAL;
    private static DEFAULT_CANVAS_OFFSETS;
    private static MAX_EFFECT_CACHE;
    private static SPRITE_INDEX_AVATAR;
    private static BASE_Y_SCALE;
    private static AVATAR_SPRITE_DEFAULT_DEPTH;
    private static AVATAR_OWN_DEPTH_ADJUST;
    private static AVATAR_SPRITE_LAYING_DEPTH;
    protected _data: AvatarVisualizationData;
    private _avatarImage;
    private _cachedAvatars;
    private _cachedAvatarEffects;
    private _shadow;
    private _lastUpdate;
    private _disposed;
    private _figure;
    private _gender;
    private _direction;
    private _headDirection;
    private _posture;
    private _postureParameter;
    private _canStandUp;
    private _postureOffset;
    private _verticalOffset;
    private _angle;
    private _headAngle;
    private _talk;
    private _expression;
    private _sleep;
    private _blink;
    private _gesture;
    private _sign;
    private _highlightEnabled;
    private _highlight;
    private _dance;
    private _effect;
    private _carryObject;
    private _useObject;
    private _ownUser;
    private _isLaying;
    private _layInside;
    private _isAnimating;
    private _extraSpritesStartIndex;
    private _forcedAnimFrames;
    private _updatesUntilFrameUpdate;
    private _isAvatarReady;
    private _needsUpdate;
    private _geometryUpdateCounter;
    private _additions;
    constructor();
    initialize(data: IObjectVisualizationData): boolean;
    dispose(): void;
    update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void;
    private createAvatarImage;
    protected updateObject(object: IRoomObject, geometry: IRoomGeometry, update: boolean, _arg_4?: boolean): boolean;
    protected updateModel(model: IRoomObjectModel, scale: number): boolean;
    protected setDirection(direction: number): void;
    private updateScale;
    private processActionsForAvatar;
    private updateFigure;
    resetFigure(figure: string): void;
    resetEffect(effect: number): void;
    private clearAvatar;
    private getAddition;
    private addAddition;
    private removeAddition;
    private updateShadow;
    getAvatarRenderAsset(name: string): Texture<Resource>;
    get direction(): number;
    get posture(): string;
    get angle(): number;
    get disposed(): boolean;
}
