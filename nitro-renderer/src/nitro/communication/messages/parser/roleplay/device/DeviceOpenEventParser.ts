import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export enum InteractionType {
    PHONE = "rp_phone",
    POLICE_LAPTOP = 'rp_police_laptop'
}

export class DeviceOpenEventParser implements IMessageParser {
    private _itemID: number;
    private _interactionType: InteractionType;

    public flush(): boolean {
        this._itemID = -1;
        this._interactionType = InteractionType.PHONE;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;
        this._itemID = wrapper.readInt();
        this._interactionType = wrapper.readString() as any
        return true;
    }

    public get itemID(): number {
        return this._itemID;
    }

    public get interactionType(): InteractionType {
        return this._interactionType;
    }
}
