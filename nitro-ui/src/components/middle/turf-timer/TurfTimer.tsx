import { useMemo } from "react";
import { useTurfTimer } from "../../../hooks/roleplay/use-turf-timer";
import { useSessionInfo } from "../../../hooks";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

export function TurfTimer() {
    const timer = useTurfTimer();
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId);

    console.log({ timer, rpStats })

    const allyPlayers = useMemo(() => {
        return timer.gangs.find(_ => _.gangId === (rpStats.gangID || 0))?.userCount ?? 0
    }, [timer.gangs, rpStats.gangID]);

    const enemyPlayers = useMemo(() => {
        return timer.gangs
            .filter(gang => gang.gangId !== rpStats.gangID)
            .reduce((total, gang) => total + gang.userCount, 0);
    }, [timer.gangs, rpStats.gangID]);

    if (timer.secondsLeft <= 0) {
        return null;
    }

    return (
        <div className="game-hud">
            <div className="objective">{timer.secondsLeft}<small style={{ fontSize: 14 }}>s</small></div>
            <div className="score-bar">
                <div className="team blue">
                    <span className="score">{allyPlayers}</span>
                </div>
                <div className={`progress-bar ${!timer.isCapturing ? 'contested' : ''}`}>
                    <div className="progress blue" style={{ width: '30%' }}></div>
                    <div className="marker"></div>
                    <div className="progress red" style={{ width: '0%' }}></div>
                    {!timer.isCapturing && <div className="contested-overlay">CONTESTED</div>}
                </div>
                <div className="team red">
                    <span className="score">{enemyPlayers}</span>
                </div>
            </div>
        </div>
    )
}