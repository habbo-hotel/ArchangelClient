import { BankListEvent, BountyData, WantedListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { WantedListQuery } from "../../api/roleplay/police/WantedListQuery";

export function useWantedList(): Array<BountyData> {
    const [bounties, setBounties] = useState<BountyData[]>([]);

    useEffect(() => {
        WantedListQuery();
    }, []);

    useMessageEvent<WantedListEvent>(BankListEvent, event => {
        const parser = event.getParser();
        setBounties(parser.bounties);
    });

    return bounties;
}