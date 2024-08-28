import { Flex } from "../../../common";
import { MyRoleplayStats } from "./MyRoleplayStats";
import { TargetRoleplayStats } from "./TargetRoleplayStats";

export function RoleplayStatsView() {
    return (
        <div style={{ padding: 20, width: 800 }}>
            <Flex fullWidth gap={4}>
                <MyRoleplayStats />
                <TargetRoleplayStats />
            </Flex>
        </div>
    )
}