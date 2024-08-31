import { ILinkEventTracker } from "@nitro-rp/renderer";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { FaBox, FaBuilding, FaInfoCircle, FaKeyboard, FaLock, FaMicrophone, FaScroll, FaSkull, FaStar, FaUserCheck, FaUserCircle, FaUserLock, FaWrench } from "react-icons/fa";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { ArchangelAboutPanel } from './archangel-section/AboutPanel';
import { ArchangelChangelogPanel } from "./archangel-section/Changelog";
import { SecurityPanel } from "./profile-section/SecurityPanel";
import { PrivacyPanel } from "./profile-section/PrivacyPanel";
import { MyJobPanel } from "./profile-section/MyJobPanel";
import { MyGangPanel } from "./profile-section/MyGangPanel";
import { InventoryPanel } from "./profile-section/InventoryPanel";
import { ExperiencePanel } from "./profile-section/ExperiencePanel";
import { ProfilePanel } from "./profile-section/ProfilePanel";
import { useSessionInfo } from "../../../hooks";
import { Flex, LayoutAvatarImageView, Text } from "../../../common";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

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

export function GameSettings() {
    const { userInfo } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);
    const [visible, setVisible] = useState(false);
    const settingOptions: SettingTop[] = useMemo(() => [
        {
            type: 'parent',
            label: (
                <>
                    <FaUserCircle style={{ marginRight: 8 }} />
                    Profile
                </>
            ),
            value: "profile",
            children: [
                {
                    type: 'child',
                    label: (
                        <Flex style={{ height: 50, overflow: 'hidden' }}>
                            <LayoutAvatarImageView figure={roleplayStats.figure} direction={2} headOnly style={{ height: 80, width: 80 }} />
                            <Text bold fontSize={4} style={{ marginTop: 15 }} variant="white">{userInfo?.username}</Text>
                        </Flex>
                    ),
                    view: <ProfilePanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaLock style={{ marginRight: 8 }} />
                            Security
                        </>
                    ),
                    view: <SecurityPanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaUserLock style={{ marginRight: 8 }} />
                            Privacy
                        </>
                    ),
                    view: <PrivacyPanel />
                },
                { type: 'divider' },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaStar style={{ marginRight: 8 }} />
                            Experience
                        </>
                    ),
                    view: <ExperiencePanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaBox style={{ marginRight: 8 }} />
                            Inventory
                        </>
                    ),
                    view: <InventoryPanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaBuilding style={{ marginRight: 8 }} />
                            My Job
                        </>
                    ),
                    view: <MyJobPanel />
                },
                {
                    type: 'child',
                    label: (
                        <>
                            <FaSkull style={{ marginRight: 8 }} />
                            My Gang
                        </>
                    ),
                    view: <MyGangPanel />
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
                    {panel?.view}
                </div>
            </div>
        </div>
    );
}