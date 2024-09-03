import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChatMessageTypeEnum, GetConfiguration, LocalizeText, RoomWidgetUpdateChatInputContentEvent } from '../../../../api';
import { Text } from '../../../../common';
import { useChatInputWidget, useRoom, useSessionInfo, useUiEvent } from '../../../../hooks';

export const ChatInputView: FC<{}> = props => {
    const [chatValue, setChatValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { chatStyleId = 0 } = useSessionInfo();
    const { selectedUsername = '', floodBlocked = false, floodBlockedSeconds = 0, setIsTyping = null, setIsIdle = null, sendChat = null } = useChatInputWidget();
    const { roomSession = null } = useRoom();
    const inputRef = useRef<HTMLInputElement>(null);

    const chatModeIdWhisper = useMemo(() => LocalizeText('widgets.chatinput.mode.whisper'), []);
    const maxChatLength = useMemo(() => GetConfiguration<number>('chat.input.maxlength', 100), []);

    const setInputFocus = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length * 2, inputRef.current.value.length * 2);
            setIsFocused(true);
        }
    }, []);

    const onKeyDownEvent = useCallback((event: KeyboardEvent) => {
        if (floodBlocked || !inputRef.current) return;

        if (event.key === 'Tab') {
            event.preventDefault();

            if (isFocused) {
                setIsFocused(false);
                return;
            }

            // If the input is not focused, focus it and set isFocused to true
            inputRef.current.focus();
            setIsFocused(true);

            return;
        }

        if (!isFocused) return;

        const value = (event.target as HTMLInputElement).value;

        switch (event.key) {
            case ' ':
            case 'Space':
                setChatValue(prevValue => `${prevValue} ${selectedUsername}`);
                return;
            case 'Enter':
                sendChatValue(value, event.shiftKey);
                return;
            case 'Backspace':
                if (value) {
                    const parts = value.split(' ');
                    if (parts[0] === chatModeIdWhisper && parts.length === 3 && parts[2] === '') {
                        setChatValue('');
                    }
                }
                return;
        }
    }, [floodBlocked, isFocused, selectedUsername, chatModeIdWhisper]);

    const sendChatValue = useCallback((value: string, shiftKey: boolean = false) => {
        if (!value || value === '') return;

        let chatType = shiftKey ? ChatMessageTypeEnum.CHAT_SHOUT : ChatMessageTypeEnum.CHAT_DEFAULT;
        let text = value;

        const parts = text.split(' ');
        let recipientName = '';

        switch (parts[0]) {
            case chatModeIdWhisper:
                chatType = ChatMessageTypeEnum.CHAT_WHISPER;
                recipientName = parts[1];
                parts.shift();
                parts.shift();
                break;
        }

        text = parts.join(' ');
        setIsTyping(false);
        setIsIdle(false);

        if (text.length <= maxChatLength) {
            setChatValue('');
            sendChat(text, chatType, recipientName, chatStyleId);
        }
    }, [chatModeIdWhisper, maxChatLength, chatStyleId]);

    useEffect(() => {
        document.body.addEventListener('keydown', onKeyDownEvent);

        return () => {
            document.body.removeEventListener('keydown', onKeyDownEvent);
        }
    }, [onKeyDownEvent]);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.parentElement.dataset.value = chatValue;
    }, [chatValue]);

    // Refocus the input if it loses focus unintentionally
    const handleBlur = () => {
        if (!isFocused) return;
        setTimeout(() => {
            if (document.activeElement !== inputRef.current) {
                setInputFocus();
            }
        }, 0);
    };

    useEffect(() => {
        if (!isFocused) {
            console.log('do it')
            inputRef.current.blur();
        }
    }, [isFocused]);

    if (!roomSession || roomSession.isSpectator) return null;

    return createPortal(
        <div className="nitro-chat-input-container glass-panel">
            <div className="input-sizer align-items-center">
                {!floodBlocked && (
                    <input
                        ref={inputRef}
                        type="text"
                        className="chat-input"
                        placeholder={LocalizeText('widgets.chatinput.default')}
                        value={chatValue}
                        maxLength={maxChatLength}
                        onBlur={handleBlur}  // Handle blur to refocus if needed
                        onChange={event => setChatValue(event.target.value)}
                        //onMouseDown={event => setInputFocus()}
                        style={{ pointerEvents: isFocused ? 'auto' : 'none' }}
                    />
                )}
                {floodBlocked && (
                    <Text variant="danger">
                        {LocalizeText('chat.input.alert.flood', ['time'], [floodBlockedSeconds.toString()])}
                    </Text>
                )}
            </div>
        </div>,
        document.getElementById('toolbar-chat-input-container')
    );
};
