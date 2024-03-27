import { Resource, Texture } from '@pixi/core';
import { GraphicAssetGifCollection } from '../../../../../api';
import { FurnitureVisualization } from './FurnitureVisualization';
export declare class FurnitureBrandedImageVisualization extends FurnitureVisualization {
    protected static BRANDED_IMAGE: string;
    protected static STATE_0: number;
    protected static STATE_1: number;
    protected static STATE_2: number;
    protected static STATE_3: number;
    protected _imageUrl: string;
    protected _shortUrl: string;
    protected _imageReady: boolean;
    protected _isAnimated: boolean;
    protected _gifCollection: GraphicAssetGifCollection;
    protected _offsetX: number;
    protected _offsetY: number;
    protected _offsetZ: number;
    protected _currentFrame: number;
    protected _totalFrames: number;
    constructor();
    dispose(): void;
    protected updateObject(scale: number, direction: number): boolean;
    protected updateModel(scale: number): boolean;
    private checkIfImageChanged;
    protected checkIfImageReady(): boolean;
    protected imageReady(texture: Texture<Resource>, imageUrl: string): void;
    protected checkAndCreateImageForCurrentState(): void;
    protected buildAssetsForGif(): void;
    protected addBackgroundAsset(texture: Texture<Resource>, state: number, frame: number): void;
    protected getSpriteAssetName(scale: number, layerId: number): string;
    protected updateAnimation(scale: number): number;
    protected getFrameNumber(scale: number, layerId: number): number;
}
