import { useBillingInvoice } from "../../../hooks/billing/use-billing-invoice";

export function PayBillingInvoice() {
    const billingInvoice = useBillingInvoice();

    if (!billingInvoice) {
        return null;
    }

    return <b>BILLING INVOICE OF DANGER</b>
}