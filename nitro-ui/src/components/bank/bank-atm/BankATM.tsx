import { useState } from 'react';
import { useMessageEvent } from '../../../hooks';
import { BankOpenATMEvent } from '@nitro-rp/renderer';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../common';
import { SetupATM } from './views/SetupATM';
import { ManageAccount } from './views/ManageAccount';


export function BankATM() {
    const [isVisible, setIsVisible] = useState(false)
    const [atmData, setATMData] = useState<{ itemID: number; corpID: number }>();

    useMessageEvent<BankOpenATMEvent>(BankOpenATMEvent, event => {
        setIsVisible(true);
        setATMData({ itemID: event.getParser().itemID, corpID: event.getParser().corpID })
    });

    if (!isVisible || !atmData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="bankATM" className="nitro-inventory">
            <NitroCardHeaderView headerText="ATM" onCloseClick={() => setIsVisible(false)} />
            <NitroCardContentView>
                {
                    atmData.corpID
                        ? <ManageAccount bankCorpID={atmData.corpID} />
                        : <SetupATM itemID={atmData.itemID} onClose={() => setIsVisible(false)} />
                }
            </NitroCardContentView>
        </NitroCardView >
    )
}