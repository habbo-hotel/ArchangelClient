import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpPositionInfoData {
    id: number;
    corpID: number;
    name: string;
    motto: string;
    salary: number;
    maleUniform: string;
    femaleUniform: string;
    canHire: boolean;
    canFire: boolean;
    canPromote: boolean;
    canDemote: boolean;
    canWorkAnywhere: boolean;
}

export class CorpPositionInfoParser implements IMessageParser {
    private _id: number;
    private _corpID: number;
    private _name: string;
    private _motto: string;
    private _salary: number;
    private _maleUniform: string;
    private _femaleUniform: string;
    private _canHire: boolean;
    private _canFire: boolean;
    private _canPromote: boolean;
    private _canDemote: boolean;
    private _canWorkAnywhere: boolean;

    public flush(): boolean {
        this._id = 0;
        this._corpID = 0;
        this._name = '';
        this._motto = '';
        this._canHire = false;
        this._canFire = false;
        this._canPromote = false;
        this._canDemote = false;
        this._canWorkAnywhere = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._corpID = wrapper.readInt();
        this._name = wrapper.readString();
        this._motto = wrapper.readString();
        this._salary = wrapper.readInt();
        this._maleUniform = wrapper.readString();
        this._femaleUniform = wrapper.readString();
        this._canHire = wrapper.readBoolean();
        this._canFire = wrapper.readBoolean();
        this._canPromote = wrapper.readBoolean();
        this._canDemote = wrapper.readBoolean();
        this._canWorkAnywhere = wrapper.readBoolean();

        return true;
    }

    public get data(): CorpPositionInfoData {
        return {
            id: this._id,
            corpID: this._corpID,
            name: this._name,
            motto: this._motto,
            salary: this._salary,
            maleUniform: this._maleUniform,
            femaleUniform: this._femaleUniform,
            canHire: this._canHire,
            canFire: this._canFire,
            canPromote: this._canPromote,
            canDemote: this._canDemote,
            canWorkAnywhere: this._canWorkAnywhere,
        }
    }
}