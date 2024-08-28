import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface MyWeaponData {
    itemID: number;
    uniqueName: string;
    displayName: string;
    equipEffect: number;
    magazineSize: number;
}

export class MyWeaponListParser implements IMessageParser {
    private _weapons: MyWeaponData[];
    private _

    public flush(): boolean {
        this._weapons = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._weapons = [];

        while (true) {
            try {
                const weaponStr = wrapper.readString().split(';')
                this._weapons.push({
                    itemID: Number(weaponStr[0]),
                    uniqueName: weaponStr[1],
                    displayName: weaponStr[2],
                    equipEffect: Number(weaponStr[3]),
                    magazineSize: Number(weaponStr[4]),
                })
            } catch (e) {
                break;
            }
        }

        return true;
    }

    public get data(): MyWeaponData[] {
        return this._weapons;
    }
}
