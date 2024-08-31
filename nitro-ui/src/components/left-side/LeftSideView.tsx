import { GameTools } from './game-tools/GameTools';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';
import { SpeechWheel } from './speech-wheel/SpeechWheel';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
            <SpeechWheel />
        </div>
    );
}
