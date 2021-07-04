import { FC, useMemo, useState } from 'react';
import { useFriendListContext } from '../../context/FriendListContext';
import { FriendBarItemView } from '../friend-bar-item/FriendBarItemView';
import { FriendBarViewProps } from './FriendBarView.types';

export const FriendBarView: FC<FriendBarViewProps> = props =>
{
    const { friendListState = null } = useFriendListContext();
    const { friends = null } = friendListState;
    const [ indexOffset, setIndexOffset ] = useState(0);

    const canDecreaseIndex = useMemo(() =>
    {
        if(indexOffset === 0) return false;

        return true;
    }, [ indexOffset ]);

    const canIncreaseIndex = useMemo(() =>
    {
        if(indexOffset === (friends.length - 1)) return false;

        return true;
    }, [ indexOffset, friends ]);

    return (
        <div className="d-flex friend-bar align-items-center">
            <button type="button" className="btn btn-sm btn-black align-self-center friend-bar-button" disabled={!canDecreaseIndex} onClick={event => setIndexOffset(indexOffset - 1)}>
                <i className="fas fa-chevron-left" />
            </button>
            <FriendBarItemView friend={ (friends[ indexOffset ] || null) } />
            <FriendBarItemView friend={ (friends[ indexOffset + 1 ] || null) } />
            <FriendBarItemView friend={ (friends[ indexOffset + 2 ] || null) } />
            <button type="button" className="btn btn-sm btn-black align-self-center friend-bar-button" disabled={!canIncreaseIndex} onClick={event => setIndexOffset(indexOffset + 1)}>
                <i className="fas fa-chevron-right" />
            </button>
        </div>
    );
}
