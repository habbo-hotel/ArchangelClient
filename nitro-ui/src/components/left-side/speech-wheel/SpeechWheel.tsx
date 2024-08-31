import { Text } from "../../../common";
import { ILinkEventTracker } from "@nitro-rp/renderer";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { FaCaretLeft } from "react-icons/fa";

interface SpeechOption {
    label: ReactNode;
    value: string
    children?: SpeechOption[];
}

const SPEECH_CATEGORIES: SpeechOption[] = [
    {
        label: 'Combat',
        value: 'combat',
        children: [
            { label: 'Attack', value: 'combat_attack' },
            { label: 'Defend', value: 'combat_defend' },
            { label: 'Reload', value: 'combat_reload' },
            { label: 'Retreat', value: 'combat_retreat' },
            { label: 'Cover', value: 'combat_cover' },
            { label: 'Grenade', value: 'combat_grenade' },
        ],
    },
    {
        label: 'Gang',
        value: 'gang',
        children: [
            { label: 'Threaten', value: 'gang_threaten' },
            { label: 'Recruit', value: 'gang_recruit' },
            { label: 'Territory', value: 'gang_territory' },
            { label: 'Challenge', value: 'gang_challenge' },
            { label: 'Retaliate', value: 'gang_retaliate' },
            { label: 'Respect', value: 'gang_respect' },
        ],
    },
    {
        label: 'Work',
        value: 'work',
        children: [
            { label: 'Sell', value: 'work_sell' },
            { label: 'Buy', value: 'work_buy' },
            { label: 'Negotiate', value: 'work_negotiate' },
            { label: 'Help', value: 'work_help' },
            { label: 'Deliver', value: 'work_deliver' },
            { label: 'Promote', value: 'work_promote' },
        ],
    },
    {
        label: 'Friendly',
        value: 'friendly',
        children: [
            { label: 'Greet', value: 'friendly_greet' },
            { label: 'Compliment', value: 'friendly_compliment' },
            { label: 'Invite', value: 'friendly_invite' },
            { label: 'Encourage', value: 'friendly_encourage' },
            { label: 'Thank', value: 'friendly_thank' },
            { label: 'Farewell', value: 'friendly_farewell' },
        ],
    },
    {
        label: 'Offensive',
        value: 'offensive',
        children: [
            { label: 'Insult', value: 'offensive_insult' },
            { label: 'Disrespect', value: 'offensive_disrespect' },
            { label: 'Challenge', value: 'offensive_challenge' },
            { label: 'Trash Talk', value: 'offensive_trashtalk' },
            { label: 'Mock', value: 'offensive_mock' },
            { label: 'Taunt', value: 'offensive_taunt' },
        ],
    },
    {
        label: 'Funny',
        value: 'funny',
        children: [
            { label: 'Joke', value: 'funny_joke' },
            { label: 'Sarcasm', value: 'funny_sarcasm' },
            { label: 'Tease', value: 'funny_tease' },
            { label: 'Prank', value: 'funny_prank' },
            { label: 'Self-Deprecation', value: 'funny_selfdeprecation' },
            { label: 'Laugh', value: 'funny_laugh' },
        ],
    },
    {
        label: 'Police',
        value: 'police',
        children: [
            { label: 'Stop', value: 'police_stop' },
            { label: 'Search', value: 'police_search' },
            { label: 'Arrest', value: 'police_arrest' },
            { label: 'Interrogate', value: 'police_interrogate' },
            { label: 'Read Rights', value: 'police_readrights' },
            { label: 'Backup', value: 'police_backup' },
        ],
    },
    {
        label: 'Taunt',
        value: 'taunt',
        children: [
            { label: 'Mock', value: 'taunt_mock' },
            { label: 'Brag', value: 'taunt_brag' },
            { label: 'Insult', value: 'taunt_insult' },
            { label: 'Challenge', value: 'taunt_challenge' },
            { label: 'Trash Talk', value: 'taunt_trashtalk' },
            { label: 'Laugh', value: 'taunt_laugh' },
        ],
    },
];


export function SpeechWheel() {
    const [visible, setVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<SpeechOption>();
    const speechOptions = useMemo(() => hoveredItem?.children ?? SPEECH_CATEGORIES, [hoveredItem?.children]);

    function useSpeechOption(speechCat: SpeechOption) {
        console.log({ speechCat })
        setHoveredItem(speechCat);
        if (!speechCat?.children) {
            setVisible(false);
        }
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
            eventUrlPrefix: 'speech-wheel/'
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
        <div id="speech-wheel" className="modal" onClick={() => setVisible(false)}>
            <div className="wheel" onClick={e => e.stopPropagation()}>
                {
                    speechOptions.map((speechCat, i) => (
                        <div className="wheel-item" id={`item${i}`} onClick={() => useSpeechOption(speechCat)}>
                            {speechCat.label}
                        </div>
                    ))
                }
                {hoveredItem?.children && (
                    <div className="wheel-item" id={`item${speechOptions.length + 1}`} onClick={() => setHoveredItem(undefined)}>
                        <FaCaretLeft /> Back
                    </div>
                )}
            </div>
            <div className="center-info">
                <div className="speech-name">
                    <Text bold fontSize={5} variant="white">
                        {hoveredItem?.label ?? ''}
                    </Text>
                </div>
            </div>
        </div>
    )
}
