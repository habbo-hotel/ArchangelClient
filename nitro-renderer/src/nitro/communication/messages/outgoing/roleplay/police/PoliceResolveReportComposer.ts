import { IMessageComposer } from "../../../../../../api";

export class PoliceResolveReportComposer implements IMessageComposer<ConstructorParameters<typeof PoliceResolveReportComposer>> {
    private _data: ConstructorParameters<typeof PoliceResolveReportComposer>;

    constructor(reportID: number, flagged: boolean) {
        this._data = [reportID, flagged];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}