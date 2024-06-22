import { useState } from "react";
import { BillingInvoice, BillingInvoiceQueryEvent, CombatDelayData } from "@nitro-rp/renderer";
import { useMessageEvent } from "../events";

export function useBillingInvoice(): BillingInvoice {
    const [billingInvoice, setBillingInvoice] = useState<BillingInvoice>({
        id: 0,
        userID: 0,
        key: '',
        title: '',
        description: '',
        chargedByCorpID: 0,
        chargedByUserID: 0,
        amountOwed: 0,
        amountPaid: 0,
    })

    useMessageEvent<BillingInvoiceQueryEvent>(BillingInvoiceQueryEvent, event => {
        const eventData: BillingInvoice = event.getParser().data;
        setBillingInvoice(eventData);
    });

    return billingInvoice;
}