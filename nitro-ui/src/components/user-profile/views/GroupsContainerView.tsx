import { HabboGroupEntryData } from '@nitro-rp/renderer';
import { AutoGrid, Base, Column, Flex, Grid, GridProps, LayoutBadgeImageView, LayoutGridItem } from '../../../common';

interface GroupsContainerViewProps extends GridProps {
    itsMe: boolean;
    groups: HabboGroupEntryData[];
    onLeaveGroup: () => void;
}

export function GroupsContainerView(props: GroupsContainerViewProps) {
    const { groups = null } = props;

    if (!groups || !groups.length) {
        return (
            <Column center fullHeight>
                <Flex justifyContent="center" gap={2}>
                    <Base className="no-group-spritesheet image-1" />
                    <Base className="no-group-spritesheet image-2" />
                    <Base className="no-group-spritesheet image-3" />
                </Flex>
            </Column>
        );
    }

    return (
        <AutoGrid overflow={null} columnCount={2} columnMinHeight={50} className="user-groups-container">
            {groups.map((group, index) => {
                return (
                    <LayoutGridItem key={index} overflow="unset" className="p-1">
                        <LayoutBadgeImageView badgeCode={group.badgeCode} isGroup={true} />
                    </LayoutGridItem>
                )
            })}
        </AutoGrid>
    );
}
