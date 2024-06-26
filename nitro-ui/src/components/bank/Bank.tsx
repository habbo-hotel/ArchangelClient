import { BankATM } from './bank-atm/BankATM';
import { BankComputer } from './bank-computer/BankComputer';

export function Bank() {
    return (
        <>
            <BankATM />
            <BankComputer />
        </>
    )
}