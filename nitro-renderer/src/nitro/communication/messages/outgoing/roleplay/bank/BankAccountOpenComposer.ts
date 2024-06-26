import { IMessageComposer } from "../../../../../../api";

export class BankAccountOpenComposer implements IMessageComposer<ConstructorParameters<typeof BankAccountOpenComposer>> {
    private _data: ConstructorParameters<typeof BankAccountOpenComposer>;

    constructor(username: string) {
        this._data = [username];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}