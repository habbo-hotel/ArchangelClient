import { ILinkEventTracker } from "@nitro-rp/renderer";
import { ReactNode, useEffect, useState } from "react";
import { FaBuilding, FaInfoCircle, FaKeyboard, FaLock, FaMicrophone, FaScroll, FaSkull, FaStar, FaUserCheck, FaUserLock, FaWrench } from "react-icons/fa";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { ArchangelAboutPanel } from './archangel-section/AboutPanel';
import { ArchangelChangelogPanel } from "./archangel-section/Changelog";

interface SettingParent {
    type: 'parent';
    label: ReactNode;
    value: string;
    children: SettingOption[];
}

interface SettingPrimary {
    type: 'primary';
    label: ReactNode;
    value: string;
    view: ReactNode;
}

type SettingTop = SettingParent | SettingPrimary;

type SettingOption = SettingChild | SettingDivider;

interface SettingChild {
    type: 'child';
    label: ReactNode;
    view: ReactNode;
}

type SettingPanel = SettingPrimary | SettingChild;

type SettingDivider = { type: 'divider'; };

const SETTING_OPTIONS: SettingTop[] = [
    {
        type: 'parent',
        label: (
            <>
                <FaUserCheck style={{ marginRight: 8 }} />
                Profile
            </>
        ),
        value: "profile",
        children: [
            {
                type: 'child',
                label: (
                    <>
                        <FaLock style={{ marginRight: 8 }} />
                        Security
                    </>
                ),
                view: 'sound'
            },
            {
                type: 'child',
                label: (
                    <>
                        <FaUserLock style={{ marginRight: 8 }} />
                        Privacy
                    </>
                ),
                view: 'sound'
            },
            { type: 'divider' },
            {
                type: 'child',
                label: (
                    <>
                        <FaBuilding style={{ marginRight: 8 }} />
                        My Job
                    </>
                ),
                view: 'sound'
            },
            {
                type: 'child',
                label: (
                    <>
                        <FaSkull style={{ marginRight: 8 }} />
                        My Gang
                    </>
                ),
                view: 'sound'
            },
        ]
    },
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
                        <FaMicrophone style={{ marginRight: 8 }} />
                        Sound
                    </>
                ),
                view: 'sound'
            },
            {
                type: 'child',
                label: (
                    <>
                        <FaKeyboard style={{ marginRight: 8 }} />
                        Controls
                    </>
                ),
                view: 'sound'
            },
            {
                type: 'child',
                label: (
                    <>
                        <FaScroll style={{ marginRight: 8 }} />
                        Macros
                    </>
                ),
                view: 'sound'
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
            { type: 'child', label: "Storyline", view: 'storyline' },
            { type: 'child', label: "How to fight", view: 'how-to-fight' },
            { type: 'child', label: "Making money", view: 'making money' },
            { type: 'child', label: "Advanced Weaponry", view: 'advanced weaponry' },
            { type: 'child', label: "Joining a gang", view: 'gang warfare' },
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
        view: <ArchangelAboutPanel />,
    }
];

export function GameSettings() {
    const [visible, setVisible] = useState(false);
    const [section, setSection] = useState<SettingTop>(SETTING_OPTIONS[0]);
    const [panel, setPanel] = useState<SettingPanel>(SETTING_OPTIONS[0].type === 'parent' ? SETTING_OPTIONS[0].children[0] as any : SETTING_OPTIONS[0])


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
                {SETTING_OPTIONS.map((option, i) => (
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
                    {panel?.view}
                </div>
            </div>
        </div>
    );
}