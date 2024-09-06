import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";


export class WeaponActionEventParser implements IMessageParser {
    private _uniqueName: string;
    private _soundLevel: number;

    public flush(): boolean {
        this._uniqueName = '';
        this._soundLevel = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false

        this._uniqueName = wrapper.readString();
        this._soundLevel = wrapper.readDouble();
        return true;
    }

    public get uniqueName(): string {
        return this._uniqueName;
    }

    public get soundLevel(): number {
        return this._soundLevel;
    }
}
