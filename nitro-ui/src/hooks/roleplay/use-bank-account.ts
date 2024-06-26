import { BankAccountData, BankAccountInfoEvent, GangInfoData, GangInfoQueryEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { BankAccountQuery } from "../../api/roleplay/bank/BankAccountQuery";

export function useBankAccount(corpID: number, userID: string): BankAccountData {
    const [bankData, setBankData] = useState<BankAccountData>({
        corpID: 0,
        userID: 0,
        checkingBalance: 0,
        debitBalance: 0,
        createdAt: 0,
        updatedAt: 0,
    });

    useEffect(() => {
        BankAccountQuery(corpID, userID);
    }, [corpID, userID]);

    useMessageEvent<BankAccountInfoEvent>(BankAccountInfoEvent, event => {
        const eventData: BankAccountData = event.getParser().data;
        if (!eventData) {
            return;
        }
        setBankData(eventData);
    });

    return bankData;
}