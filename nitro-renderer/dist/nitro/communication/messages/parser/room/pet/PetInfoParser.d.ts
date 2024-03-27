import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
export declare class PetInfoParser implements IMessageParser {
    private _id;
    private _name;
    private _level;
    private _maximumLevel;
    private _experience;
    private _energy;
    private _happyness;
    private _levelExperienceGoal;
    private _maximumEnergy;
    private _maximumHappyness;
    private _respect;
    private _ownerId;
    private _ownerName;
    private _age;
    private _rarityLevel;
    private _saddle;
    private _rider;
    private _breedable;
    private _fullyGrown;
    private _dead;
    private _maximumTimeToLive;
    private _remainingTimeToLive;
    private _remainingGrowTime;
    private _skillThresholds;
    private _publiclyRideable;
    private _unknownRarity;
    private _publiclyBreedable;
    flush(): boolean;
    parse(wrapper: IMessageDataWrapper): boolean;
    get id(): number;
    get name(): string;
    get level(): number;
    get maximumLevel(): number;
    get experience(): number;
    get energy(): number;
    get happyness(): number;
    get levelExperienceGoal(): number;
    get maximumEnergy(): number;
    get maximumHappyness(): number;
    get respect(): number;
    get ownerId(): number;
    get ownerName(): string;
    get age(): number;
    get rarityLevel(): number;
    get saddle(): boolean;
    get rider(): boolean;
    get breedable(): boolean;
    get fullyGrown(): boolean;
    get dead(): boolean;
    get maximumTimeToLive(): number;
    get remainingTimeToLive(): number;
    get remainingGrowTime(): number;
    get skillTresholds(): number[];
    get publiclyRideable(): number;
    get unknownRarity(): number;
    get publiclyBreedable(): boolean;
}
