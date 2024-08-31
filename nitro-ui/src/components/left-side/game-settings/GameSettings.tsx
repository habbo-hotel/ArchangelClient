import { ILinkEventTracker } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaUserCheck, FaWrench } from "react-icons/fa";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";

const SETTING_OPTIONS = [
    {
        label: (
            <>
                <FaUserCheck style={{ marginRight: 8 }} />
                Profile
            </>
        ),
        value: "profile",
        children: [
            { label: "Settings" },
            { label: "Privacy" }
        ]
    },
    {
        label: (
            <>
                <FaWrench style={{ marginRight: 8 }} />
                Settings
            </>
        ),
        value: "settings",
        children: [
            { label: "Graphics" },
            { label: "Sound" }
        ]
    },
    {
        label: (
            <>
                <FaInfoCircle style={{ marginRight: 8 }} />
                Help
            </>
        ),
        value: "help",
        children: [
            { label: "Graphics" },
            { label: "Sound" }
        ]
    }
];

export function GameSettings() {
    const [visible, setVisible] = useState(false);
    const [section, setSection] = useState(SETTING_OPTIONS[0]);

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
                        onClick={() => setSection(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
            <div className="menu-content">
                <div className="menu-sidebar">
                    {section.children?.map((child, i) => (
                        <div className="menu-item" key={`settings_opt_${i}`}>
                            {child.label}
                        </div>
                    ))}
                </div>
                <div className="menu-settings">
                    i pooped
                </div>
            </div>
        </div>
    );
}