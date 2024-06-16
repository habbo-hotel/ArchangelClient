import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CombatDelayParser } from "../../../parser/roleplay/combat/CombatDelayParser";

export class CombatDelayEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CombatDelayParser);
    }

    public getParser(): CombatDelayParser {
        return this.parser as CombatDelayParser;
    }
}
