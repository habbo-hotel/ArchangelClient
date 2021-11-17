import { FC } from 'react';
import { useNitroCardContext } from '../context';
import { NitroCardContentViewProps } from './NitroCardContextView.types';

export const NitroCardContentView: FC<NitroCardContentViewProps> = props =>
{
    const { theme = 'primary',  children = null, className = '', ...rest } = props;
    const { simple = false } = useNitroCardContext();
    
    return (
        <div className={ `container-fluid content-area d-flex flex-column overflow-auto ${ (simple ? 'simple' : '') } ${ className || '' }` } { ...rest }>
            { children }
        </div>
    );
}
