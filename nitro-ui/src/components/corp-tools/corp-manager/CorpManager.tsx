import { useEffect, useMemo, useState } from "react";
import { Tab } from "../../inventory/Inventory.types";
import { CorpInfo } from "./views/corp-info/CorpInfo";
import { CorpPositions } from "./views/corp-positions/CorpPositions";
import { CorpEmployees } from "./views/corp-employees/CorpEmployees";
import { NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView } from "../../../common";
import { CorpOpenComputerEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";

export interface CorpManagerViewProps {
    corpID: number;
}

export function CorpManager() {
    const [visible, setVisible] = useState(true);
    const [corpID, setCorpID] = useState<number>();
    const tabs: Tab[] = useMemo(() => [
        {
            label: 'Info',
            children: <CorpInfo corpID={corpID} />
        },
        {
            label: 'Positions',
            children: <CorpPositions corpID={corpID} />
        },
        {
            label: 'Employees',
            children: <CorpEmployees corpID={corpID} />
        },
    ], [corpID]);
    const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

    useMessageEvent<CorpOpenComputerEvent>(CorpOpenComputerEvent, event => {
        const parser = event.getParser();
        console.log(parser)
        setCorpID(parser.corpID);
        setVisible(true);
    })

    useEffect(() => {
        setCurrentTab(tabs[0]);
    }, [tabs]);

    if (!visible || !corpID) {
        return null;
    }

    return (
        <>
            <NitroCardView uniqueKey="corpManager" className="nitro-inventory" style={{ minWidth: 600, minHeight: 450 }}>
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