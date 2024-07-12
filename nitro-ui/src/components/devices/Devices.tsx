import { InfoScreen } from "./info-screen/InfoScreen";
import { BankATM } from "./bank-atm/BankATM";
import { BankComputer } from "./bank-computer/BankComputer";
import { LicenseComputer } from "./license-computer/LicenseComputer";
import { UserPhone } from "./user-phone/UserPhone";
import { PoliceLaptop } from "./police-laptop/PoliceLaptop";

export function Devices() {
    return (
        <>
            <InfoScreen />
            <BankATM />
            <BankComputer />
            <LicenseComputer />
            <UserPhone />
            <PoliceLaptop />
        </>
    )
}