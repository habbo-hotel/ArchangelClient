import { AvatarFigurePartType, FurnitureMannequinSaveLookComposer, FurnitureMannequinSaveNameComposer, FurnitureMultiStateComposer, IAvatarFigureContainer, Nitro, NitroEvent, RoomEngineTriggerWidgetEvent, RoomObjectVariable } from 'nitro-renderer';
import { FC, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { GetRoomEngine } from '../../../../../api/nitro/room/GetRoomEngine';
import { GetRoomSession } from '../../../../../api/nitro/session/GetRoomSession';
import { GetSessionDataManager } from '../../../../../api/nitro/session/GetSessionDataManager';
import { CreateEventDispatcherHook } from '../../../../../hooks/events/event-dispatcher.base';
import { useRoomEngineEvent } from '../../../../../hooks/events/nitro/room/room-engine-event';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../../layout';
import { LocalizeText } from '../../../../../utils/LocalizeText';
import { AvatarImageView } from '../../../../shared/avatar-image/AvatarImageView';
import { useRoomContext } from '../../../context/RoomContext';
import { RoomWidgetRoomObjectUpdateEvent } from '../../../events';
import { FurnitureMannequinData } from './FurnitureMannequinData';
import { FurnitureMannequinViewMode, FurnitureMannequinViewProps } from './FurnitureMannequinView.types';

export const FurnitureMannequinView: FC<FurnitureMannequinViewProps> = props =>
{
    const { eventDispatcher = null, widgetHandler = null } = useRoomContext();

    const parts = [
        AvatarFigurePartType.CHEST_ACCESSORY,
        AvatarFigurePartType.COAT_CHEST,
        AvatarFigurePartType.CHEST,
        AvatarFigurePartType.LEGS,
        AvatarFigurePartType.SHOES,
        AvatarFigurePartType.WAIST_ACCESSORY
    ];
    const baseAvatar = ['hd', 99999, 99998];
        
    const [ mannequinData, setMannequinData ]   = useState<FurnitureMannequinData>(null);
    const [ viewMode, setViewMode ]             = useState('');

    useEffect(() =>
    {
        if(mannequinData && !mannequinData.renderedFigure)
        {
            const figureContainer = Nitro.instance.avatar.createFigureContainer(mannequinData.figure);
            loadMannequinFigure(figureContainer);
        }
    }, [ mannequinData ]);

    const onNitroEvent = useCallback((event: NitroEvent) =>
    {
        switch(event.type)
        {
            case RoomEngineTriggerWidgetEvent.REQUEST_MANNEQUIN: {
                const widgetEvent = (event as RoomEngineTriggerWidgetEvent);

                const roomObject = GetRoomEngine().getRoomObject(widgetEvent.roomId, widgetEvent.objectId, widgetEvent.category);

                if(!roomObject) return;
                
                const figure            = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_MANNEQUIN_FIGURE);
                const gender            = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_MANNEQUIN_GENDER);
                const name              = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_MANNEQUIN_NAME);

                const figureContainer   = Nitro.instance.avatar.createFigureContainer(figure);
                const clubLevel         = Nitro.instance.avatar.getFigureClubLevel(figureContainer, gender, parts);
                
                const mannequinData     = new FurnitureMannequinData(widgetEvent.objectId, widgetEvent.category, name, figure, gender, clubLevel);
                
                setMannequinData(mannequinData);
                loadViewMode(mannequinData);
                return;
            }
            case RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED: {
                const widgetEvent = (event as RoomWidgetRoomObjectUpdateEvent);

                setMannequinData(prevState =>
                    {
                        if(!prevState || (widgetEvent.id !== prevState.objectId) || (widgetEvent.category !== prevState.category)) return prevState;

                        return null;
                    });
                return;
            }
        }
    }, []);

    useRoomEngineEvent(RoomEngineTriggerWidgetEvent.REQUEST_MANNEQUIN, onNitroEvent);
    CreateEventDispatcherHook(RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED, eventDispatcher, onNitroEvent);

    const loadMannequinFigure = useCallback((figureContainer: IAvatarFigureContainer) =>
    {  
        for(const item of figureContainer.getPartTypeIds())
        {
            if(parts.indexOf(item) === -1)
            {
                figureContainer.removePart(item);
            }
        }

        figureContainer.updatePart(baseAvatar[0].toString(), Number(baseAvatar[1]), [ Number(baseAvatar[2]) ]);

        setMannequinData(mannequinData => new FurnitureMannequinData(mannequinData.objectId, mannequinData.category, mannequinData.name, mannequinData.figure, mannequinData.gender, mannequinData.clubLevel, figureContainer.getFigureString()));
    }, []);

    const loadViewMode = useCallback((mannequinData: FurnitureMannequinData) =>
    {
        if(!mannequinData) return;
        
        const userCanEdit       = (GetRoomSession().isRoomOwner || GetSessionDataManager().isModerator);
        const userGender        = Nitro.instance.sessionDataManager.gender;
        const userClubLevel     = Nitro.instance.sessionDataManager.clubLevel;

        if(userCanEdit)
        {
            setViewMode(FurnitureMannequinViewMode.EDIT);
        }
        else
        {
            if(!mannequinData.figure || mannequinData.figure.length <= 1) return;

            if(userGender.toUpperCase() !== mannequinData.gender.toUpperCase())
            {
                setViewMode(FurnitureMannequinViewMode.INCOMPATIBLE_GENDER);
            }
            else if(userClubLevel < mannequinData.clubLevel)
            {
                setViewMode(FurnitureMannequinViewMode.CLUB);
            }
            else
            {
                setViewMode(FurnitureMannequinViewMode.DEFAULT);
            }
        }
    }, []);
    
    const processAction = useCallback((type: string, value: string = null) =>
    {
        switch(type)
        {
            case 'close':
                setMannequinData(null);
                return;
            case 'set_name':
                setMannequinData(mannequinData => new FurnitureMannequinData(mannequinData.objectId, mannequinData.category, value, mannequinData.figure, mannequinData.gender, mannequinData.clubLevel, mannequinData.renderedFigure));
                return;
            case 'load_figure':
                loadMannequinFigure(Nitro.instance.avatar.createFigureContainer(Nitro.instance.sessionDataManager.figure));
                setViewMode(FurnitureMannequinViewMode.SAVE);
                return;
            case 'back':
                loadMannequinFigure(Nitro.instance.avatar.createFigureContainer(mannequinData.figure));
                setViewMode(FurnitureMannequinViewMode.EDIT);
                return;
            case 'save_name':
                GetRoomSession().connection.send(new FurnitureMannequinSaveNameComposer(mannequinData.objectId, mannequinData.name));
                return;
            case 'save_figure':
                GetRoomSession().connection.send(new FurnitureMannequinSaveLookComposer(mannequinData.objectId));
                processAction('save_name');
                processAction('close');
                return;
            case 'wear':
                GetRoomSession().connection.send(new FurnitureMultiStateComposer(mannequinData.objectId));
                processAction('close');
                return;
        }
    }, [ mannequinData ]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    {
        if(event.key !== 'Enter') return;

        processAction('save_name');
    };

    if(!mannequinData) return null;

    return (
        <NitroCardView className="nitro-mannequin" simple={ true }>
            <NitroCardHeaderView headerText={ LocalizeText('mannequin.widget.title') } onCloseClick={ event => processAction('close') } />
            <NitroCardContentView>
                <div className="row">
                    <div className="col-4">
                        <div className="mannequin-preview">
                            <AvatarImageView figure={ mannequinData.renderedFigure } direction={ 2 } />
                        </div>
                    </div>
                    <div className="col">
                        { viewMode === FurnitureMannequinViewMode.EDIT && <>
                            <input type="text" className="form-control mb-2" value={ mannequinData.name }  onChange={ event => processAction('set_name', event.target.value) } onKeyDown={ event => handleKeyDown(event) } /> 
                            <div className="btn btn-success mb-2 w-100" onClick={ event => processAction('load_figure') }>{ LocalizeText('mannequin.widget.style') }</div>
                            <div className="btn btn-success w-100" onClick={ event => processAction('wear') }>{ LocalizeText('mannequin.widget.wear') }</div>
                        </> }
                        { viewMode === FurnitureMannequinViewMode.SAVE && <>
                            <div className="d-flex flex-column h-100">
                                <div className="h-100">
                                    <div className="mb-2 text-black fw-bold">{ mannequinData.name }</div>
                                    <div className="text-black">{ LocalizeText('mannequin.widget.savetext') }</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text-black text-decoration-underline" onClick={ event => processAction('back') }>{ LocalizeText('mannequin.widget.back') }</div>
                                    <div className="btn btn-success" onClick={ event => processAction('save_figure') }>{ LocalizeText('mannequin.widget.save') }</div>
                                </div>
                            </div>
                        </> }
                        { viewMode === FurnitureMannequinViewMode.DEFAULT && <>
                            <div className="d-flex flex-column h-100">
                                <div className="h-100">
                                    <div className="mb-2 text-black fw-bold">{ mannequinData.name }</div>
                                    <div className="text-black">{ LocalizeText('mannequin.widget.weartext') }</div>
                                </div>
                                <div className="btn btn-success float-end" onClick={ event => processAction('wear') }>{ LocalizeText('mannequin.widget.wear') }</div>
                            </div>
                        </> }
                        { viewMode === FurnitureMannequinViewMode.CLUB && <>
                            <div className="text-black">{ LocalizeText('mannequin.widget.clubnotification') }</div>
                        </> }
                        { viewMode === FurnitureMannequinViewMode.INCOMPATIBLE_GENDER && <>
                            <div className="text-black">{ LocalizeText('mannequin.widget.wronggender') }</div>
                        </> }
                    </div>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}
