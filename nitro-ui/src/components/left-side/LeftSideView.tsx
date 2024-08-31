import { GameTools } from './game-tools/GameTools';
import { GameSettings } from './game-settings/GameSettings';
import { SpeechWheel } from './speech-wheel/SpeechWheel';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';
import { UserProfile } from './user-profile/UserProfile';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
            <SpeechWheel />
            <GameSettings />
            <UserProfile />
        </div>
    );
}
