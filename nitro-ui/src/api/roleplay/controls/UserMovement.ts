import { SendMessageComposer } from "../../nitro";
import { MovementDirection, UserMovementComposer } from "@nitro-rp/renderer";

export function UserMovement(direction: MovementDirection) {
    SendMessageComposer(new UserMovementComposer(direction));
}