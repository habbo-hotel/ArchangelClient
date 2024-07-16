import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface HotBarItem {
    id: number;
    name: string;
    baseItemId: number;
    spriteId: number;
}

export class HotBarListItemsEventParser implements IMessageParser {
    private _items: HotBarItem[];

    public flush(): boolean {
        this._items = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const itemCount = wrapper.readInt();

        for (let i = 0; i < itemCount; i++) {
            const [id, name, baseItemId, spriteId] = wrapper.readString().split(';');
            this._items.push({
                id: Number(id),
                name,
                baseItemId: Number(baseItemId),
                spriteId: Number(spriteId)
            })
        }

        return true;
    }

    public get items(): HotBarItem[] {
        return this._items;
    }
}
