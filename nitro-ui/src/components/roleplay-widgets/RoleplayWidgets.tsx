import { CorpProfile } from "./corp-profile/CorpProfile";
import { GameControls } from "./game-controls/GameControls";
import { GangProfile } from "./gang-profile/GangProfile";

export function RoleplayWidgets() {
    return (
        <>
            <CorpProfile />
            <GangProfile />
            <GameControls />
        </>
    )
}