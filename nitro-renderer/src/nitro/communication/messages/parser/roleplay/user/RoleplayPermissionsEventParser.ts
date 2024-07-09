import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface RoleplayPermissionsData {
    canSeeAllRooms: boolean;
}

export class RoleplayPermissionsEventParser implements IMessageParser {
    private _canSeeAllRooms: boolean;

    public flush(): boolean {
        this._canSeeAllRooms = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._canSeeAllRooms = wrapper.readBoolean();

        return true;
    }

    public get data(): RoleplayPermissionsData {
        return {
            canSeeAllRooms: this._canSeeAllRooms,
        }
    }

    public get canSeeAllRooms(): boolean {
        return this._canSeeAllRooms;
    }
}
