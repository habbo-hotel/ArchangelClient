import { InfoScreen } from "./info-screen/InfoScreen";
import { BankATM } from "./bank-atm/BankATM";
import { BankComputer } from "./bank-computer/BankComputer";

export function Devices() {
    return (
        <>
            <InfoScreen />
            <BankATM />
            <BankComputer />
        </>
    )
}