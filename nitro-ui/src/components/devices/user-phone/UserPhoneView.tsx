import { useMemo, useRef } from 'react';
import { Column, ColumnProps, DraggableWindow, DraggableWindowPosition, DraggableWindowProps } from '../../../common';

export interface UserPhoneViewProps extends DraggableWindowProps, ColumnProps {
    theme?: string;
}

export function UserPhoneView(props: UserPhoneViewProps) {
    const { theme = 'primary', uniqueKey = null, handleSelector = '.drag-handler', windowPosition = DraggableWindowPosition.CENTER, disableDrag = false, overflow = 'hidden', position = 'relative', gap = 0, classNames = [], ...rest } = props;
    const elementRef = useRef<HTMLDivElement>();

    const getClassNames = useMemo(() => {
        const newClassNames: string[] = ['nitro-card', 'rounded', 'shadow',];

        newClassNames.push(`theme-${theme || 'primary'}`);

        if (classNames.length) newClassNames.push(...classNames);

        return newClassNames;
    }, [theme, classNames]);

    return (
        <DraggableWindow uniqueKey={uniqueKey} handleSelector={handleSelector} windowPosition={windowPosition} disableDrag={disableDrag}>
            <Column innerRef={elementRef} overflow={overflow} position={position} gap={gap} classNames={getClassNames} {...rest} />
        </DraggableWindow>
    );
}
