import { FurnitureExchangeComposer, NitroEvent, RoomEngineTriggerWidgetEvent, RoomObjectVariable } from 'nitro-renderer';
import { FC, useCallback, useState } from 'react';
import { GetRoomEngine, GetRoomSession } from '../../../../../api';
import { CreateEventDispatcherHook } from '../../../../../hooks/events/event-dispatcher.base';
import { useRoomEngineEvent } from '../../../../../hooks/events/nitro/room/room-engine-event';
import { NitroCardContentView } from '../../../../../layout';
import { NitroCardView } from '../../../../../layout/card/NitroCardView';
import { NitroCardSimpleHeaderView } from '../../../../../layout/card/simple-header';
import { LocalizeText } from '../../../../../utils/LocalizeText';
import { useRoomContext } from '../../../context/RoomContext';
import { RoomWidgetRoomObjectUpdateEvent } from '../../../events';
import { FurnitureExchangeCreditData } from './FurnitureExchangeCreditData';
import { FurnitureExchangeCreditProps } from './FurnitureExchangeCreditView.types';

export const FurnitureExchangeCreditView: FC<FurnitureExchangeCreditProps> = props =>
{
    const { eventDispatcher = null, widgetHandler = null } = useRoomContext();
    const [ exchangeCreditData, setExchangeCreditData ] = useState<FurnitureExchangeCreditData>(null);

    const onNitroEvent = useCallback((event: NitroEvent) =>
    {
        switch(event.type)
        {
            case RoomEngineTriggerWidgetEvent.REQUEST_CREDITFURNI: {
                const widgetEvent = (event as RoomEngineTriggerWidgetEvent);

                const roomObject = GetRoomEngine().getRoomObject(widgetEvent.roomId, widgetEvent.objectId, widgetEvent.category);

                if(!roomObject) return;

                const value = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_CREDIT_VALUE);

                setExchangeCreditData(new FurnitureExchangeCreditData(widgetEvent.objectId, widgetEvent.category, value));
                return;
            }
            case RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED: {
                const widgetEvent = (event as RoomWidgetRoomObjectUpdateEvent);

                setExchangeCreditData(prevState =>
                    {
                        if(!prevState || (widgetEvent.id !== prevState.objectId) || (widgetEvent.category !== prevState.category)) return prevState;

                        return null;
                    });
                return;
            }
        }
    }, []);

    useRoomEngineEvent(RoomEngineTriggerWidgetEvent.REQUEST_CREDITFURNI, onNitroEvent);
    CreateEventDispatcherHook(RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED, eventDispatcher, onNitroEvent);

    const processAction = useCallback((type: string, value: string = null) =>
    {
        switch(type)
        {
            case 'close':
                setExchangeCreditData(null);
                return;
            case 'redeem':
                if(!exchangeCreditData) return null;
                
                GetRoomSession().connection.send(new FurnitureExchangeComposer(exchangeCreditData.objectId));
                return;
        }
    }, [exchangeCreditData]);

    if(!exchangeCreditData) return null;

    return (
        <NitroCardView className="nitro-exchange-credit">
            <NitroCardSimpleHeaderView headerText={ LocalizeText('catalog.redeem.dialog.title') } onCloseClick={ event => processAction('close') } />
            <NitroCardContentView>
                <div className="text-black mb-2">
                    { LocalizeText('widgets.furniture.credit.redeem.value', [ 'value' ], [ exchangeCreditData.value.toString() ]) }
                </div>
                <button className="btn btn-success w-100" onClick={ event => processAction('redeem') }>{ LocalizeText('catalog.redeem.dialog.button.exchange') }</button>
            </NitroCardContentView>
        </NitroCardView>
    );
}
