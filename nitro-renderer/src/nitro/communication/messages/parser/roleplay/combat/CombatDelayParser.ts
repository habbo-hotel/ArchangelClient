import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CombatDelayData {
    combatBlocked: boolean;
    combatDelayRemaining: number;
}

export class CombatDelayParser implements IMessageParser {
    private _combatBlocked: boolean;
    private _combatDelayRemaining: number;

    public flush(): boolean {
        this._combatBlocked = false;
        this._combatDelayRemaining = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;
        while (true) {
            try {
                this._combatBlocked = wrapper.readBoolean();
                this._combatDelayRemaining = wrapper.readInt();
            } catch (e) {
                break;
            }
        }

        return true;
    }

    public get data(): CombatDelayData {
        return {
            combatBlocked: this._combatBlocked,
            combatDelayRemaining: this._combatDelayRemaining,
        }
    }
}
