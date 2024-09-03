import React, { useState, useEffect, useRef } from "react";
import { MovementDirection } from "@nitro-rp/renderer";
import { UserMovement } from "../../../api/roleplay/controls/UserMovement";
import { FaCaretSquareDown, FaCaretSquareLeft, FaCaretSquareRight, FaCaretSquareUp } from "react-icons/fa";

export function GameControls() {
    const [activeKey, setActiveKey] = useState<string | null>(null);  // Track the active key
    const [activeDirection, setActiveDirection] = useState<MovementDirection | null>(null);
    const controlRef = useRef<HTMLDivElement>(null);

    function onMove(direction: MovementDirection) {
        if (direction === activeDirection) {
            setActiveKey(null);
            UserMovement(MovementDirection.STOP);
            setActiveDirection(MovementDirection.STOP);
            return;
        }

        if (direction !== activeDirection) {
            controlRef.current.focus();
            UserMovement(direction);
            setActiveDirection(direction);
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        if (!controlRef.current || document.activeElement?.classList?.contains('chat-input')) {
            return;
        }

        const key = event.key.toLowerCase();

        if (key !== activeKey) {
            setActiveKey(key);

            switch (key) {
                case 'w':
                case "arrowup":
                    controlRef.current.focus();
                    onMove(MovementDirection.UP);
                    break;
                case 'a':
                case "arrowleft":
                    controlRef.current.focus();
                    onMove(MovementDirection.LEFT);
                    break;
                case 's':
                case "arrowdown":
                    controlRef.current.focus();
                    onMove(MovementDirection.DOWN);
                    break;
                case 'd':
                case "arrowright":
                    controlRef.current.focus();
                    onMove(MovementDirection.RIGHT);
                    break;
                default:
                    break;
            }
        }

        event.stopPropagation();
    }

    function onKeyUp(event: KeyboardEvent) {
        const key = event.key.toLowerCase();

        if (key === activeKey) {
            setActiveKey(null);
            onMove(MovementDirection.STOP);
            setActiveDirection(null);
        }

        event.stopPropagation();
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [activeDirection, activeKey]);

    return (
        <div
            ref={controlRef}
            tabIndex={0}
            style={{
                zIndex: 100,
                pointerEvents: 'all',
                position: 'absolute',
                bottom: 40,
                left: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                outline: 'none',  // Remove default outline when focused
            }}
        >
            <div onClick={() => onMove(MovementDirection.UP)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.UP ? 'cyan' : 'white' }}>
                <FaCaretSquareUp size={40} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120 }}>
                <div onClick={() => onMove(MovementDirection.LEFT)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.LEFT ? 'cyan' : 'white' }}>
                    <FaCaretSquareLeft size={40} />
                </div>
                <div onClick={() => onMove(MovementDirection.DOWN)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.DOWN ? 'cyan' : 'white' }}>
                    <FaCaretSquareDown size={40} />
                </div>
                <div onClick={() => onMove(MovementDirection.RIGHT)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.RIGHT ? 'cyan' : 'white' }}>
                    <FaCaretSquareRight size={40} />
                </div>
            </div>
        </div>
    );
}
