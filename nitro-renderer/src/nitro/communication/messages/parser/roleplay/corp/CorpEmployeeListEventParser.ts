import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpEmployeeData {
    userID: number;
    username: string;
    figure: string;
    corpPositionID: number;
    corpPositionName: string;
}


export class CorpEmployeeListEventParser implements IMessageParser {
    private _corpID: number;
    private _corpEmployees: CorpEmployeeData[];

    public flush(): boolean {
        this._corpID = -1;
        this._corpEmployees = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._corpID = wrapper.readInt();
        const totalUsers = wrapper.readInt();

        for (let i = 0; i < totalUsers; i++) {
            const [userID, username, figure, corpPositionID, corpPositionName] = wrapper.readString().split(';');
            this._corpEmployees.push({ userID: Number(userID), username, figure, corpPositionID: Number(corpPositionID), corpPositionName });
        }

        return true;
    }

    public get corpID(): number {
        return this._corpID;
    }

    public get corpEmployees(): Array<CorpEmployeeData> {
        return this._corpEmployees;
    }

}
