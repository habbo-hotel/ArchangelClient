import { useMemo, useState } from "react";
import { Tab } from "../../inventory/Inventory.types";
import { CorpInfo } from "./views/corp-info/CorpInfo";
import { CorpFinances } from "./views/corp-finances/CorpFinances";
import { CorpPositions } from "./views/corp-positions/CorpPositions";
import { CorpEmployees } from "./views/corp-employees/CorpEmployees";
import { NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView } from "../../../common";
import { CorpOpenComputerEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";

export function CorpManager() {
    const [visible, setVisible] = useState(true);
    const [corpID, setCorpID] = useState<number>();
    const tabs: Tab[] = useMemo(() => [
        {
            label: 'Info',
            children: <CorpInfo />
        },
        {
            label: 'Positions',
            children: <CorpPositions />
        },
        {
            label: 'Employees',
            children: <CorpEmployees />
        },
        {
            label: 'Finances',
            children: <CorpFinances />
        },
    ], []);
    const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

    useMessageEvent<CorpOpenComputerEvent>(CorpOpenComputerEvent, event => {
        const parser = event.getParser();
        console.log(parser)
        setCorpID(parser.corpID);
        setVisible(true);
    })

    if (!visible || !corpID) {
        return null;
    }

    return (
        <>
            <NitroCardView uniqueKey="corpManager" className="nitro-inventory">

                <NitroCardHeaderView headerText="Corp Manager" onCloseClick={() => setVisible(false)} />
                <NitroCardContentView>
                    <NitroCardTabsView>
                        {tabs.map((tab, index) => {
                            return (
                                <NitroCardTabsItemView key={index} isActive={(currentTab === tab)} onClick={() => setCurrentTab(tab)}>
                                    {tab.label}
                                </NitroCardTabsItemView>
                            );
                        })}
                    </NitroCardTabsView>
                    {currentTab.children}
                </NitroCardContentView>
            </NitroCardView>

        </>
    );
}