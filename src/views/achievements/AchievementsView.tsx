import { FC, useCallback, useEffect, useReducer, useState } from 'react';
import { AchievementsEvent } from '../../events/achievements';
import { useUiEvent } from '../../hooks/events';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../layout';
import { LocalizeText } from '../../utils/LocalizeText';
import { AchievementsMessageHandler } from './AchievementsMessageHandler';
import { AchievementsViewProps } from './AchievementsView.types';
import { AchievementsContextProvider } from './context/AchievementsContext';
import { AchievementsReducer, initialAchievements } from './reducers/AchievementsReducer';
import { AchievementsListView } from './views/list/AchievementsListView';

export const AchievementsView: FC<AchievementsViewProps> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ achievementsState, dispatchAchievementsState ] = useReducer(AchievementsReducer, initialAchievements);
    const { categories = null, score = null, selectedCategoryName = null } = achievementsState;

    const onAchievementsEvent = useCallback((event: AchievementsEvent) =>
    {
        switch(event.type)
        {
            case AchievementsEvent.SHOW_ACHIEVEMENTS:
                setIsVisible(true);
                return;
            case AchievementsEvent.HIDE_ACHIEVEMENTS:
                setIsVisible(false);
                return;   
            case AchievementsEvent.TOGGLE_ACHIEVEMENTS:
                setIsVisible(value => !value);
                return;
        }
    }, []);

    useUiEvent(AchievementsEvent.SHOW_ACHIEVEMENTS, onAchievementsEvent);
    useUiEvent(AchievementsEvent.HIDE_ACHIEVEMENTS, onAchievementsEvent);
    useUiEvent(AchievementsEvent.TOGGLE_ACHIEVEMENTS, onAchievementsEvent);
    
    useEffect(() =>
    {
        if(!isVisible) return;

    }, [ isVisible ]);

    return (
        <AchievementsContextProvider value={ { achievementsState, dispatchAchievementsState } }>
            <AchievementsMessageHandler />
            { isVisible &&
                <NitroCardView className="nitro-achievements">
                    <NitroCardHeaderView headerText={ LocalizeText('inventory.achievements') } onCloseClick={ event => setIsVisible(false) } />
                    <NitroCardContentView>
                        <div className="row">
                            <div className="col-6">
                                <AchievementsListView />
                                <div className="score border border-2 text-black text-center rounded">
                                    { LocalizeText('achievements.categories.score', ['score'], [score.toString()]) }
                                </div>
                            </div>
                            <div className="col-6">
                                
                            </div>
                        </div>
                    </NitroCardContentView>
                </NitroCardView> }
        </AchievementsContextProvider>
    );
};
