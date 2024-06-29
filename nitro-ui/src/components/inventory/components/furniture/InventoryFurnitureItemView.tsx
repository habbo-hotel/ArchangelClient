import { MouseEventType } from '@nitro-rp/renderer';
import { MouseEvent, useState } from 'react';
import { attemptItemPlacement, } from '../../../../api';
import { LayoutGridItem } from '../../../../common';
import { useInventoryFurni } from '../../../../hooks';

export function InventoryFurnitureItemView({ groupItem = null, ...rest }: any) {
    const [isMouseDown, setMouseDown] = useState(false);
    const { selectedItem = null, setSelectedItem = null } = useInventoryFurni();

    const onMouseEvent = (event: MouseEvent) => {
        switch (event.type) {
            case MouseEventType.MOUSE_DOWN:
                setSelectedItem(groupItem);
                setMouseDown(true);
                return;
            case MouseEventType.MOUSE_UP:
                setMouseDown(false);
                return;
            case MouseEventType.ROLL_OUT:
                if (!isMouseDown || !(groupItem === selectedItem)) return;

                attemptItemPlacement(groupItem);
                return;
            case 'dblclick':
                attemptItemPlacement(groupItem);
                return;
        }
    }

    const count = groupItem.getUnlockedCount();

    return <LayoutGridItem className={!count ? 'opacity-0-5 ' : ''} itemImage={groupItem.iconUrl} itemCount={groupItem.getUnlockedCount()} itemActive={(groupItem === selectedItem)} itemUniqueNumber={groupItem.stuffData.uniqueNumber} itemUnseen={groupItem.hasUnseenItems} onMouseDown={onMouseEvent} onMouseUp={onMouseEvent} onMouseOut={onMouseEvent} onDoubleClick={onMouseEvent} {...rest} />;
}
