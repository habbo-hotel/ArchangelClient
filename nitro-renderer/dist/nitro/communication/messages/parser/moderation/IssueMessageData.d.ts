import { PatternMatchData } from './PatternMatchData';
export declare class IssueMessageData {
    static STATE_OPEN: number;
    static STATE_PICKED: number;
    static STATE_CLOSED: number;
    private _issueId;
    private _state;
    private _categoryId;
    private _reportedCategoryId;
    private _issueAgeInMilliseconds;
    private _priority;
    private _groupingId;
    private _reporterUserId;
    private _reporterUserName;
    private _reportedUserId;
    private _reportedUserName;
    private _pickerUserId;
    private _pickerUserName;
    private _message;
    private _chatRecordId;
    private _patterns;
    private _disposed;
    private _creationTimeInMilliseconds;
    constructor(issueId: number, state: number, categoryId: number, reportedCategoryId: number, issueAgeinMs: number, priority: number, groupingId: number, reporterUserId: number, reporterUsername: string, reportedUserId: number, reportedUsername: string, pickerUserId: number, pickerUsername: string, message: string, chatRecordId: number, patterns: PatternMatchData[]);
    get issueId(): number;
    get state(): number;
    get categoryId(): number;
    get reportedCategoryId(): number;
    get issueAgeInMilliseconds(): number;
    get priority(): number;
    get groupingId(): number;
    get reporterUserId(): number;
    get reporterUserName(): string;
    get reportedUserId(): number;
    get reportedUserName(): string;
    get pickerUserId(): number;
    get pickerUserName(): string;
    get message(): string;
    get chatRecordId(): number;
    get patterns(): PatternMatchData[];
    dispose(): void;
    get disposed(): boolean;
    getOpenTime(k: number): string;
}