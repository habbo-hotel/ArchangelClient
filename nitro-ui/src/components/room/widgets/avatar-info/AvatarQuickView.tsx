import { FixedSizeStack, GetTicker, NitroPoint, NitroRectangle, RoomObjectType } from '@nitro-rp/renderer';
import { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import { AvatarInfoUser, GetNitroInstance, GetRoomObjectBounds, GetRoomObjectScreenLocation, GetRoomSession } from '../../../../api';
import { Base, BaseProps, Flex, Text } from '../../../../common';
import { useRoleplayStats } from '../../../../hooks/roleplay/use-rp-stats';
import { useAvatarInfoWidget } from '../../../../hooks';

interface AvatarQuickViewProps extends BaseProps<HTMLDivElement> {
    objectId: number;
    category: number;
    userType?: number;
}

const LOCATION_STACK_SIZE: number = 25;
const BUBBLE_DROP_SPEED: number = 3;
const SPACE_AROUND_EDGES = 10;

let FIXED_STACK: FixedSizeStack = null;
let MAX_STACK = -1000000;

export const AvatarQuickView: FC<AvatarQuickViewProps> = ({ objectId = -1, category = -1, userType = -1, position = 'absolute', classNames = [], style = {} }) => {
    const [pos, setPos] = useState<{ x: number, y: number }>({ x: null, y: null });
    const elementRef = useRef<HTMLDivElement>();
    const { avatarInfo } = useAvatarInfoWidget();
    const roleplayStats = useRoleplayStats((avatarInfo as AvatarInfoUser)?.webID);

    const updatePosition = useCallback((bounds: NitroRectangle, location: NitroPoint) => {
        if (!bounds || !location || !FIXED_STACK) return;

        let offset = -(elementRef.current.offsetHeight);

        offset += -20;


        FIXED_STACK.addValue(location.y - bounds.top);

        let maxStack = FIXED_STACK.getMax();
        if (maxStack < (MAX_STACK - BUBBLE_DROP_SPEED)) {
            maxStack = MAX_STACK - BUBBLE_DROP_SPEED;
        }

        MAX_STACK = maxStack;

        const deltaY = location.y - maxStack;

        let x = Math.floor(location.x - (elementRef.current.offsetWidth / 2));
        let y = Math.floor(deltaY + offset);

        x = Math.max(SPACE_AROUND_EDGES, Math.min(x, GetNitroInstance().width - elementRef.current.offsetWidth - SPACE_AROUND_EDGES));
        y = Math.max(SPACE_AROUND_EDGES, Math.min(y, GetNitroInstance().height - elementRef.current.offsetHeight - SPACE_AROUND_EDGES));

        setPos({ x, y });
    }, [userType]);

    useEffect(() => {
        FIXED_STACK = new FixedSizeStack(LOCATION_STACK_SIZE);
        MAX_STACK = -1000000;

        const update = () => {
            const bounds = GetRoomObjectBounds(GetRoomSession().roomId, objectId, category);
            const location = GetRoomObjectScreenLocation(GetRoomSession().roomId, objectId, category);
            updatePosition(bounds, location);
        };

        const ticker = GetTicker();
        ticker.add(update);

        return () => ticker.remove(update);  // Cleanup function
    }, [objectId, category, updatePosition]);

    const classNamesCombined = ['always-visible', ...classNames]; // Ensures visibility
    const getStyle: CSSProperties = { ...style, left: pos.x || 0, top: pos.y || 0, visibility: 'visible' }; // Explicitly sets visibility

    const healthPercent = (roleplayStats.healthNow > 0 ? roleplayStats.healthNow / roleplayStats.healthMax : 0) * 100;

    if (!avatarInfo) {
        return null;
    }

    return (
        <Base innerRef={elementRef} position={position} classNames={classNamesCombined} style={getStyle}>
            <Flex justifyContent="center" alignItems="center" column gap={4}>
                <div style={{ border: '1px solid white', borderRadius: 4, width: 100 }}>
                    <div className="progress" data-label={healthPercent <= 0 ? 'Dead' : `Health ${healthPercent}%`} >
                        <span className="value" style={{ background: 'linear-gradient(90deg, #ff4757, #ff6b81)', width: healthPercent }}></span>
                    </div>
                </div>
            </Flex>
        </Base >
    );
}
