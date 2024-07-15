import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface HotBarItem {
    id: number;
    name: string;
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
            const [id, name] = wrapper.readString().split(';');
            this._items.push({
                id: Number(id),
                name,
            })
        }

        return true;
    }

    public get items(): HotBarItem[] {
        return this._items;
    }
}
