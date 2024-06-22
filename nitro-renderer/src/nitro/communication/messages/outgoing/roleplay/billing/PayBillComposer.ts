import { IMessageComposer } from "../../../../../../api";

export class PayBillComposer implements IMessageComposer<ConstructorParameters<typeof PayBillComposer>> {
    private _data: ConstructorParameters<typeof PayBillComposer>;

    constructor(billID: string) {
        this._data = [billID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}