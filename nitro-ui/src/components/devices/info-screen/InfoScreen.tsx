import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { InfoScreenData, InfoScreenViewEvent } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { InfoScreenSave } from "../../../api/roleplay/device/InfoScreenSave";

export function InfoScreen() {
    const [isVisible, setIsVisible] = useState(false)
    const [editing, setEditing] = useState(false);
    const [info, setInfo] = useState<InfoScreenData>();
    const [content, setContent] = useState('');

    useMessageEvent<InfoScreenViewEvent>(InfoScreenViewEvent, event => {
        setIsVisible(true);
        setInfo(event.getParser().data);
        setContent(event.getParser().content);
    });

    function onClose() {
        setIsVisible(false);
    }

    function onSave() {
        InfoScreenSave(info.itemID, content);
        setIsVisible(false);
        setEditing(false);
        setContent('');
    }

    if (!isVisible || !info) {
        return null;
    }

    const [btnLabel, btnAction] = editing
        ? ['Save', onSave]
        : ['Edit', () => setEditing(true)]

    return (
        <NitroCardView uniqueKey="infoScreen" className="nitro-inventory">
            <NitroCardHeaderView headerText="Info Screen" onCloseClick={onClose} />
            <NitroCardContentView>
                { }
                {
                    !editing
                        ? <Text fontSize={6}>{info.content}</Text>
                        : (
                            <textarea className="flex-grow-1 form-control w-100" value={content} onChange={event => setContent(event.currentTarget.value)} />
                        )
                }
                {
                    info.canEdit && (
                        <Button style={{ width: '100%' }} size="lg" type="button" variant="success" onClick={btnAction}>
                            {btnLabel}
                        </Button>
                    )
                }
            </NitroCardContentView>
        </NitroCardView >
    )
}