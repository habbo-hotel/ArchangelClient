import { FaDollarSign } from "react-icons/fa";
import { useSessionInfo } from "../../../hooks";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

export function CashBalance() {
    const userInfo = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userInfo?.userId);
    return (
        <div className="cash-balance glass-panel " style={{ width: '100%' }}>
            <FaDollarSign style={{ marginRight: 8 }} />
            {Number(rpStats.cashBalance).toLocaleString()}
        </div>
    )
}