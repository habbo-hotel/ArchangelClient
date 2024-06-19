import { useEffect, useState } from "react";
import { LocalizeText } from "../../../api";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useBillingInvoice } from "../../../hooks/billing/use-billing-invoice";

export function PayBillingInvoice() {
    const [isVisible, setIsVisible] = useState(false);
    const billingInvoice = useBillingInvoice();

    useEffect(() => {
        if (!billingInvoice) {
            return;
        }
        setIsVisible(true);
    }, [billingInvoice]);

    if (!billingInvoice) {
        return null;
    }

    if (!isVisible) {
        return false;
    }

    return (
        <NitroCardView uniqueKey="billingInvoice" className="nitro-inventory">
            <NitroCardHeaderView headerText={LocalizeText('billing_invoice.title')} onCloseClick={() => setIsVisible(false)} />
            <NitroCardContentView>
                <Text bold>{LocalizeText('billing_invoice.statement')}:</Text>
                <Text bold fontSize={3}>{billingInvoice.title}</Text>
                <Text bold>{LocalizeText('billing_invoice.description')}:</Text>
                <Text fontSize={3}>{billingInvoice.description}</Text>
                <Text bold>{LocalizeText('billing_invoice.amount_charged')}:</Text>
                <Text fontSize={3}>${billingInvoice.amountOwed}</Text>
            </NitroCardContentView>
        </NitroCardView >
    )
}
