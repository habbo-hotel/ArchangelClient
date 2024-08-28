import { GameTools } from './game-tools/GameTools';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
        </div>
    );
}
