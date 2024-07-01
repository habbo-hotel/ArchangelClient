import { CorpManager } from './corp-manager/CorpManager';
import { CashRegister } from './cash-register/CashRegister';
import { CorpInventory } from './corp-inventory/CorpInventory';

export function CorpTools() {
    return (
        <>
            <CorpManager />
            <CashRegister />
            <CorpInventory />
        </>
    )
}