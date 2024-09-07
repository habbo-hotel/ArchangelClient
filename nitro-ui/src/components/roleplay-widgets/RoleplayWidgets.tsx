import { GameControls } from "./game-controls/GameControls";
import { WeaponEffects } from "./weapon-effects/WeaponEffects";
import { CommunityManager } from "./community-manager/CommunityManager";

export function RoleplayWidgets() {
    return (
        <>
            <GameControls />
            <WeaponEffects />
            <CommunityManager />
        </>
    )
}