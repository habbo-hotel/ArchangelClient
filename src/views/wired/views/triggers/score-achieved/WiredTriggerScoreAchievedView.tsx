import { FC, useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { LocalizeText } from '../../../../../utils/LocalizeText';
import { useWiredContext } from '../../../context/WiredContext';
import { WiredFurniType } from '../../../WiredView.types';
import { WiredTriggerBaseView } from '../base/WiredTriggerBaseView';

export const WiredTriggeScoreAchievedView: FC<{}> = props =>
{
    const [ points, setPoints ] = useState(1);
    const { trigger = null, setIntParams = null } = useWiredContext();

    useEffect(() =>
    {
        setPoints((trigger.intData.length > 0) ? trigger.intData[0] : 0);
    }, [ trigger ]);

    const save = useCallback(() =>
    {
        setIntParams([ points ]);
    }, [ points,  setIntParams ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } save={ save }>
            <div className="form-group">
                <label className="fw-bold">{ LocalizeText('wiredfurni.params.setscore', [ 'points' ], [ points.toString() ]) }</label>
                <ReactSlider
                    className={ 'nitro-slider' }
                    min={ 1 }
                    max={ 1000 }
                    value={ points }
                    onChange={ event => setPoints(event) } />
            </div>
        </WiredTriggerBaseView>
    );
}
