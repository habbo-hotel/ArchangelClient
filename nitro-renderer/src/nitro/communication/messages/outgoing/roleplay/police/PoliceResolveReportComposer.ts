import { IMessageComposer } from "../../../../../../api";

export class PoliceResolveReportComposer implements IMessageComposer<ConstructorParameters<typeof PoliceResolveReportComposer>> {
    private _data: ConstructorParameters<typeof PoliceResolveReportComposer>;

    constructor(reportID: number) {
        this._data = [reportID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}