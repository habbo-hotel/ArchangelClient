import { useMessageEvent } from "../";
import { useEffect, useState } from "react";
import { HotBarListItems } from "../../api/roleplay/items/HotBarListItems";
import { HotBarItem, HotBarListItemsEvent } from "@nitro-rp/renderer";

export function useHotBar(): HotBarItem[] {
    const [items, setItems] = useState<HotBarItem[]>([]);

    useMessageEvent<HotBarListItemsEvent>(HotBarListItemsEvent, event => {
        const parser = event.getParser();
        setItems(parser.items);
    });

    useEffect(() => {
        HotBarListItems();
    }, []);

    return items;
}