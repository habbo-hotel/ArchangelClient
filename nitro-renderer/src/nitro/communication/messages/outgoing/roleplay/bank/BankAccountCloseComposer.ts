import { IMessageComposer } from "../../../../../../api";

export class BankAccountCloseComposer implements IMessageComposer<ConstructorParameters<typeof BankAccountCloseComposer>> {
    private _data: ConstructorParameters<typeof BankAccountCloseComposer>;

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