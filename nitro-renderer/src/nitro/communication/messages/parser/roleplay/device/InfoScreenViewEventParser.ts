import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface InfoScreenData {
    itemID: number;
    content: string;
    canEdit: boolean;
}

export class InfoScreenViewEventParser implements IMessageParser {
    private _itemID: number;
    private _content: string;
    private _canEdit: boolean;

    public flush(): boolean {
        this._itemID = 0;
        this._content = '';
        this._canEdit = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._itemID = wrapper.readInt();
        this._content = wrapper.readString();
        this._canEdit = wrapper.readBoolean();

        return true;
    }

    public get data(): InfoScreenData {
        return {
            itemID: this._itemID,
            content: this._content,
            canEdit: this._canEdit,
        }
    }

    public get itemID(): number {
        return this._itemID;
    }

    public get content(): string {
        return this._content;
    }

    public get canEdit(): boolean {
        return this._canEdit;
    }

}
