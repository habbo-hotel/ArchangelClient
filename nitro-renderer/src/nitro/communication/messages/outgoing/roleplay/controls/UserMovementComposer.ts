import { IMessageComposer } from "../../../../../../api";

export enum MovementDirection {
    UP = "up",
    LEFT = "left",
    DOWN = "down",
    RIGHT = "right",
    STOP = "stop"

}

export class UserMovementComposer implements IMessageComposer<ConstructorParameters<typeof UserMovementComposer>> {
    private _data: ConstructorParameters<typeof UserMovementComposer>;

    constructor(direction: MovementDirection) {
        this._data = [direction];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}