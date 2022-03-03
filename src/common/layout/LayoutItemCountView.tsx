import { FC, useMemo } from 'react';
import { Base, BaseProps } from '..';

interface LayoutItemCountViewProps extends BaseProps<HTMLDivElement>
{
    count: number;
}

export const LayoutItemCountView: FC<LayoutItemCountViewProps> = props =>
{
    const { count = 0, position = 'aboslute', classNames = [], children = null, ...rest } = props;

    const getClassNames = useMemo(() =>
    {
        const newClassNames: string[] = [ 'badge', 'border', 'bg-danger', 'px-1', 'rounded-circle', 'nitro-item-count' ];

        if(classNames.length) newClassNames.push(...classNames);

        return newClassNames;
    }, [ classNames ]);

    return (
        <Base position="absolute" classNames={ getClassNames } { ...rest }>
            { count }
            { children }
        </Base>
    );
}
