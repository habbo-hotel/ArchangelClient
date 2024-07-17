import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BountyData {
    userId: number;
    username: string;
    look: string;
    crime: string;
}


export class WantedListEventParser implements IMessageParser {
    private _bounties: BountyData[];

    public flush(): boolean {
        this._bounties = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false
        const bountyCount = wrapper.readInt();

        for (let i = 0; i < bountyCount; i++) {
            const [userId, username, look, crime] = wrapper.readString().split(';');
            this._bounties.push({
                userId: Number(userId),
                username,
                look,
                crime,
            })
        }
        return true;
    }

    public get bounties(): BountyData[] {
        return this._bounties;
    }

}
