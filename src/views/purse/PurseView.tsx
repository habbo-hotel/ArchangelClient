import { UserCurrencyComposer } from 'nitro-renderer';
import { FC, useCallback, useEffect, useMemo, useReducer } from 'react';
import { GetConfiguration } from '../../api';
import { NotificationCenterEvent } from '../../events';
import { dispatchUiEvent } from '../../hooks/events';
import { SendMessageHook } from '../../hooks/messages/message-event';
import { SetLastCurrencies } from './common/CurrencyHelper';
import { PurseContextProvider } from './context/PurseContext';
import { CurrencyView } from './currency/CurrencyView';
import { PurseMessageHandler } from './PurseMessageHandler';
import { PurseViewProps } from './PurseView.types';
import { initialPurse, PurseReducer } from './reducers/PurseReducer';

export const PurseView: FC<PurseViewProps> = props =>
{
    const [ purseState, dispatchPurseState ] = useReducer(PurseReducer, initialPurse);
    const { currencies = [] } = purseState;
    
    const displayedCurrencies = useMemo(() =>
    {
        return GetConfiguration<number[]>('system.currency.types', []);
    }, []);

    useEffect(() =>
    {
        SendMessageHook(new UserCurrencyComposer());
    }, []);

    SetLastCurrencies(currencies);

    const toggleNotificationCenter = useCallback(() =>
    {
        dispatchUiEvent(new NotificationCenterEvent(NotificationCenterEvent.TOGGLE_NOTIFICATION_CENTER));
    }, []);

    return (
        <PurseContextProvider value={ { purseState, dispatchPurseState }}>
            <PurseMessageHandler />
            <div className="nitro-purse rounded d-flex flex-row py-1 justify-content-between">
                { currencies && currencies.map(currency =>
                    {
                        if(displayedCurrencies.indexOf(currency.type) === -1) return null;

                        return <CurrencyView key={ currency.type } currency={ currency } />;
                    }) }
                <div className="notification-button px-2" onClick={ toggleNotificationCenter }>
                    <i className="fas fa-bars" />
                </div> 
            </div>
        </PurseContextProvider>
    );
}
