import { Column, Flex, FlexProps, Grid, Text } from '../../../common';
import { LocalizeText } from '../../../api';
import { ProgressBar } from '../../roleplay-stats/progress-bar/ProgressBar';
import { useRoleplayStats } from '../../../hooks/roleplay/use-rp-stats';

interface RoleplayStatsContainerViewProps extends FlexProps {
    userID: number;
}

export function RoleplayStatsContainerView({ userID }: RoleplayStatsContainerViewProps) {
    const roleplayStats = useRoleplayStats(userID);
    return (
        <>
            <Text bold fontSize={4}>Stats</Text>
            <Grid className="bg-muted rounded px-2 py-1">
                <Column size={4}>
                    <Text bold fontSize={6}>{LocalizeText('roleplay.stats.health')}</Text>
                    <Text fontSize={5}>100/100</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>{LocalizeText('roleplay.stats.energy')}</Text>
                    <Text fontSize={5}>100/100</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>{LocalizeText('roleplay.stats.hunger')}</Text>
                    <Text fontSize={5}>100/100</Text>
                </Column>
            </Grid>
            <Text bold fontSize={4}>Skill Levels</Text>
            <Grid className="bg-muted rounded px-2 py-1">
                <Column size={4}>
                    <Text bold fontSize={6}>Strength</Text>
                    <Text fontSize={4}>1</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>Melee</Text>
                    <Text fontSize={4}>1</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>Combat</Text>
                    <Text fontSize={4}>1</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>Lumberjack</Text>
                    <Text fontSize={4}>1</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>Mining</Text>
                    <Text fontSize={4}>1</Text>
                </Column>
                <Column size={4}>
                    <Text bold fontSize={6}>Fishing</Text>
                    <Text fontSize={4}>1</Text>
                </Column>
            </Grid>
        </>
    );
}
