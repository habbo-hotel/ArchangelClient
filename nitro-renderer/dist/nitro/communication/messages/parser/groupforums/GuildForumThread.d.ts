import { IMessageDataWrapper } from '../../../../../api';
export declare class GuildForumThread {
    private _threadId;
    private _authorId;
    private _authorName;
    private _creationTimeAsSecondsAgo;
    private _header;
    private _totalMessages;
    private _unreadMessagesCount;
    private _lastMessageId;
    private _lastUserId;
    private _lastUserName;
    private _lastCommentTime;
    private _state;
    private _adminId;
    private _adminName;
    private _adminOperationTimeAsSecondsAgo;
    private _isPinned;
    private _isLocked;
    static parse(wrapper: IMessageDataWrapper): GuildForumThread;
    get adminOperationTimeAsSecondsAgo(): number;
    set adminOperationTimeAsSecondsAgo(k: number);
    get lastCommentTime(): number;
    set lastCommentTime(time: number);
    get threadId(): number;
    set threadId(id: number);
    get authorId(): number;
    set authorId(id: number);
    get authorName(): string;
    set authorName(name: string);
    get creationTimeAsSecondsAgo(): number;
    set creationTimeAsSecondsAgo(time: number);
    get header(): string;
    set header(header: string);
    get lastMessageId(): number;
    set lastMessageId(id: number);
    get lastUserId(): number;
    set lastUserId(id: number);
    get lastUserName(): string;
    set lastUserName(name: string);
    get totalMessages(): number;
    set totalMessages(total: number);
    get unreadMessagesCount(): number;
    set unreadMessagesCount(count: number);
    get state(): number;
    set state(state: number);
    get adminId(): number;
    set adminId(id: number);
    get adminName(): string;
    set adminName(name: string);
    get isPinned(): boolean;
    set isPinned(k: boolean);
    get isLocked(): boolean;
    set isLocked(flag: boolean);
}
