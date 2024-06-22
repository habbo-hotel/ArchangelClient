import { useEffect, useState } from "react";
import { LocalizeText } from "../../../api";
import { Button, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useBillingInvoice } from "../../../hooks/billing/use-billing-invoice";
import { PayBill } from "../../../api/roleplay/billing/PayBill";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { useSessionInfo } from "../../../hooks";

export function PayBillingInvoice() {
    const [isVisible, setIsVisible] = useState(false);
    const billingInvoice = useBillingInvoice();
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId);
    const hasEnoughCredits = rpStats.cashBalance >= billingInvoice.amountOwed;

    function onPayBill() {
        PayBill(billingInvoice.id.toString());
        setIsVisible(false);
    }

    useEffect(() => {
        if (!billingInvoice) {
            return;
        }
        setIsVisible(true);
    }, [billingInvoice]);

    if (!billingInvoice.id) {
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
                <Button disabled={!hasEnoughCredits} onClick={onPayBill}>
                    {LocalizeText(hasEnoughCredits ? 'billing_invoice.pay' : 'billing_invoice.not_enough')}
                </Button>
            </NitroCardContentView>
        </NitroCardView >
    )
}
