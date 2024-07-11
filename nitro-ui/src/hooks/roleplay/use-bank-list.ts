import { BankListEvent, BankListRow } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { BankListQuery } from "../../api/roleplay/bank/BankListQuery";

export function useBankList(): Array<BankListRow> {
    const [banks, setBanks] = useState<BankListRow[]>([]);

    useEffect(() => {
        BankListQuery();
    }, []);

    useMessageEvent<BankListEvent>(BankListEvent, event => {
        const parser = event.getParser();
        setBanks(parser.banks);
    });

    return banks;
}