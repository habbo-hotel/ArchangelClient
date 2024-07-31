import { RoomDeleteComposer } from '@nitro-rp/renderer';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { CreateLinkEvent, GetMaxVisitorsList, IRoomData, LocalizeText, SendMessageComposer } from '../../../../api';
import { AutoGrid, Base, Column, Flex, Text } from '../../../../common';
import { useNavigator, useNotification } from '../../../../hooks';

const ROOM_NAME_MIN_LENGTH = 3;
const ROOM_NAME_MAX_LENGTH = 60;
const DESC_MAX_LENGTH = 255;

interface NavigatorRoomSettingsTabViewProps {
    roomData: IRoomData;
    handleChange: (field: string, value: string | number | boolean | string[]) => void;
    onClose: () => void;
}

export const NavigatorRoomSettingsBasicTabView: FC<NavigatorRoomSettingsTabViewProps> = props => {
    const { roomData = null, handleChange = null, onClose = null } = props;
    const [roomName, setRoomName] = useState<string>('');
    const [roomDescription, setRoomDescription] = useState<string>('');
    const [roomTags, setRoomTags] = useState<string[]>(['']);
    const { showConfirm = null } = useNotification();
    const { categories = null } = useNavigator();

    const deleteRoom = () => {
        showConfirm(LocalizeText('navigator.roomsettings.deleteroom.confirm.message', ['room_name'], [roomData.roomName]), () => {
            SendMessageComposer(new RoomDeleteComposer(roomData.roomId));

            if (onClose) onClose();

            CreateLinkEvent('navigator/search/myworld_view');
        },
            null, null, null, LocalizeText('navigator.roomsettings.deleteroom.confirm.title'));
    }

    const saveRoomName = () => {
        if ((roomName === roomData.roomName) || (roomName.length < ROOM_NAME_MIN_LENGTH) || (roomName.length > ROOM_NAME_MAX_LENGTH)) return;

        handleChange('name', roomName);
    }

    function onAddTag() {
        setRoomTags(_ => [
            ..._,
            '',
        ])
    }

    function onChangeTag(index: number, event: ChangeEvent<HTMLInputElement>) {
        event.persist();
        setRoomTags(_ => {
            const newRoomsTags = [..._];
            newRoomsTags[index] = event.target.value;
            return newRoomsTags;
        })
    }

    function onSaveTags() {
        handleChange('tags', roomTags)
    }

    const saveRoomDescription = () => {
        if ((roomDescription === roomData.roomDescription) || (roomDescription.length > DESC_MAX_LENGTH)) return;

        handleChange('description', roomDescription);
    }

    useEffect(() => {
        setRoomName(roomData.roomName);
        setRoomDescription(roomData.roomDescription);
        setRoomTags(roomData.tags);
    }, [roomData]);

    return (
        <>
            <Flex alignItems="center" gap={1}>
                <Text className="col-3">{LocalizeText('navigator.roomname')}</Text>
                <Column fullWidth gap={0}>
                    <input className="form-control form-control-sm" value={roomName} maxLength={ROOM_NAME_MAX_LENGTH} onChange={event => setRoomName(event.target.value)} onBlur={saveRoomName} />
                    {(roomName.length < ROOM_NAME_MIN_LENGTH) &&
                        <Text bold small variant="danger">
                            {LocalizeText('navigator.roomsettings.roomnameismandatory')}
                        </Text>}
                </Column>
            </Flex>
            <Flex alignItems="center" gap={1}>
                <Text className="col-3">{LocalizeText('navigator.roomsettings.desc')}</Text>
                <textarea className="form-control form-control-sm" value={roomDescription} maxLength={DESC_MAX_LENGTH} onChange={event => setRoomDescription(event.target.value)} onBlur={saveRoomDescription} />
            </Flex>
            <Flex alignItems="center" gap={1}>
                <Text className="col-3">{LocalizeText('navigator.category')}</Text>
                <select className="form-select form-select-sm" value={roomData.categoryId} onChange={event => handleChange('category', event.target.value)}>
                    {categories && categories.map(category => <option key={category.id} value={category.id}>{LocalizeText(category.name)}</option>)}
                </select>
            </Flex>
            <Flex alignItems="center" gap={1}>
                <Text className="col-3">{LocalizeText('navigator.maxvisitors')}</Text>
                <select className="form-select form-select-sm" value={roomData.userCount} onChange={event => handleChange('max_visitors', event.target.value)}>
                    {GetMaxVisitorsList && GetMaxVisitorsList.map(value => <option key={value} value={value}>{value}</option>)}
                </select>
            </Flex>
            <Flex alignItems="center" gap={1}>
                <Text className="col-3">{LocalizeText('navigator.tradesettings')}</Text>
                <select className="form-select form-select-sm" value={roomData.tradeState} onChange={event => handleChange('trade_state', event.target.value)}>
                    <option value="0">{LocalizeText('navigator.roomsettings.trade_not_allowed')}</option>
                    <option value="1">{LocalizeText('navigator.roomsettings.trade_not_with_Controller')}</option>
                    <option value="2">{LocalizeText('navigator.roomsettings.trade_allowed')}</option>
                </select>
            </Flex>
            <Text className="col-3">
                {LocalizeText('navigator.tags')}
                <FaPlusCircle className="fa-icon" onClick={onAddTag} style={{ cursor: 'pointer', marginLeft: 4 }} />
            </Text>
            <AutoGrid columnCount={3} columnMinWidth={50} columnMinHeight={50}>
                {
                    roomTags.map((tag, index) => (
                        <Column fullWidth gap={0} key={`room_tag_${index}`}>
                            <input className="form-control form-control-sm" value={tag} onChange={event => onChangeTag(index, event)} onBlur={onSaveTags} />
                        </Column>
                    ))
                }
            </AutoGrid>
            <Flex alignItems="center" gap={1}>
                <Base className="col-3" />
                <input className="form-check-input" type="checkbox" checked={roomData.allowWalkthrough} onChange={event => handleChange('allow_walkthrough', event.target.checked)} />
                <Text>{LocalizeText('navigator.roomsettings.allow_walk_through')}</Text>
            </Flex>
            <Text variant="danger" underline bold pointer className="d-flex justify-content-center align-items-center gap-1" onClick={deleteRoom}>
                <FaTimes className="fa-icon" />
                {LocalizeText('navigator.roomsettings.delete')}
            </Text>
        </>
    );
};
