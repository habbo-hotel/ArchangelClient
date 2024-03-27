import { IMessageDataWrapper } from '../../../../../api';
export declare class ClubOfferData {
    private _offerId;
    private _productCode;
    private _priceCredits;
    private _priceActivityPoints;
    private _priceActivityPointsType;
    private _vip;
    private _months;
    private _extraDays;
    private _daysLeftAfterPurchase;
    private _year;
    private _month;
    private _day;
    private _giftable;
    constructor(wrapper: IMessageDataWrapper);
    get offerId(): number;
    get productCode(): string;
    get priceCredits(): number;
    get priceActivityPoints(): number;
    get priceActivityPointsType(): number;
    get vip(): boolean;
    get months(): number;
    get extraDays(): number;
    get daysLeftAfterPurchase(): number;
    get year(): number;
    get month(): number;
    get day(): number;
    get giftable(): boolean;
}
