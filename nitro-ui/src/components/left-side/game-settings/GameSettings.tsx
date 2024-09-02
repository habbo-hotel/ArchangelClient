import { ILinkEventTracker } from "@nitro-rp/renderer";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { FaInfoCircle, FaKeyboard, FaLock, FaMicrophone, FaScroll, FaStar, FaUserLock, FaWrench } from "react-icons/fa";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { ArchangelAboutPanel } from './archangel-section/AboutPanel';
import { useSessionInfo } from "../../../hooks";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { SecurityPanel } from "./settings-section/SecurityPanel";
import { PrivacyPanel } from "./settings-section/PrivacyPanel";
import { SoundPanel } from "./settings-section/SoundPanel";
import { ControlsPanel } from "./settings-section/ContorlsPanel";

export interface SettingParent {
    type: 'parent';
    label: ReactNode;
    value: string;
    children: SettingOption[];
}

export interface SettingPrimary {
    type: 'primary';
    label: ReactNode;
    value: string;
    view: () => ReactNode;
}

export type SettingTop = SettingParent | SettingPrimary;

export type SettingOption = SettingChild | SettingDivider;

export interface SettingChild {
    type: 'child';
    label: ReactNode;
    view: () => ReactNode;
}

export type SettingPanel = SettingPrimary | SettingChild;

export type SettingDivider = { type: 'divider'; };

export function GameSettings() {
    const { userInfo } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const [visible, setVisible] = useState(false);
    const settingOptions: SettingTop[] = useMemo(() => [
        {
            type: 'parent',
            label: (
                <>
                    <FaWrench style={{ marginRight: 8 }} />
                    Settings
                </>
            ),
            value: "settings",
            children: [
                {
                    type: 'child',
                    label: (
                        <>
                            <FaLock style={{ marginRight: 8 }} />
                            Security
                        </>
                    ),
                    view: () => <SecurityPanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaUserLock style={{ marginRight: 8 }} />
                            Privacy
                        </>
                    ),
                    view: () => <PrivacyPanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaMicrophone style={{ marginRight: 8 }} />
                            Sound
                        </>
                    ),
                    view: () => <SoundPanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaKeyboard style={{ marginRight: 8 }} />
                            Controls
                        </>
                    ),
                    view: () => 'sound'
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaScroll style={{ marginRight: 8 }} />
                            Macros
                        </>
                    ),
                    view: () => <ControlsPanel />
                },
            ]
        },
        {
            type: 'parent',
            label: (
                <>
                    <FaInfoCircle style={{ marginRight: 8 }} />
                    Help
                </>
            ),
            value: "help",
            children: [
                { type: 'child', label: "Storyline", view: () => 'storyline' },
                { type: 'child', label: "How to fight", view: () => 'how-to-fight' },
                { type: 'child', label: "Making money", view: () => 'making money' },
                { type: 'child', label: "Advanced Weaponry", view: () => 'advanced weaponry' },
                { type: 'child', label: "Joining a gang", view: () => 'gang warfare' },
            ]
        },
        {
            type: 'primary',
            label: (
                <>
                    <FaStar style={{ marginRight: 8 }} />
                    Archangel
                </>
            ),
            value: "archangel",
            view: () => <ArchangelAboutPanel />,
        }
    ], [userInfo?.username, roleplayStats.figure]);

    const [section, setSection] = useState<SettingTop>(settingOptions[0]);
    const [panel, setPanel] = useState<SettingPanel>(settingOptions[0].type === 'parent' ? settingOptions[0].children[0] as any : settingOptions[0])


    function onChangeSection(section: SettingTop) {
        setSection(section);
        setPanel(section.type === 'parent' ? section.children[0] as any : section);
    }

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) {
                    case 'show':
                        setVisible(true);
                        return;
                    case 'hide':
                        setVisible(false);
                        return;
                    case 'toggle':
                        setVisible(_ => !_);
                        return;
                }
            },
            eventUrlPrefix: 'game-settings/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    if (!visible) {
        return null;
    }


    return (
        <div id="habbo-roleplay-menu">
            <div className="menu-tabs">
                {settingOptions.map((option, i) => (
                    <div
                        className={`tab ${section.value === option.value ? "active" : ""}`}
                        key={`settings_sect_${i}`}
                        onClick={() => onChangeSection(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
            <div className="menu-content">
                {
                    section.type === 'parent' && (
                        <div className="menu-sidebar">
                            {section.children?.map((child, i) => {
                                if (child.type === 'divider') {
                                    return <hr key={`settings_opt_${i}`} style={{ background: 'white', height: 2 }} />
                                }
                                return (
                                    <div className={`menu-item ${panel === child ? 'active' : ''}`} key={`settings_opt_${i}`} onClick={() => setPanel(child)}>
                                        {child.label}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
                <div className="menu-settings">
                    {panel.view ? panel.view() : ''}
                </div>
            </div>
        </div>
    );
}