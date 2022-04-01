import { StringDataType } from '@nitrots/nitro-renderer';
import { FC, useEffect, useMemo, useState } from 'react';
import { AutoGrid, AutoGridProps, LayoutBadgeImageView, LayoutGridItem } from '../../../../../common';
import { useInventoryBadges } from '../../../../../hooks';
import { useCatalogContext } from '../../../CatalogContext';

const EXCLUDED_BADGE_CODES: string[] = [];

interface CatalogBadgeSelectorWidgetViewProps extends AutoGridProps
{

}

export const CatalogBadgeSelectorWidgetView: FC<CatalogBadgeSelectorWidgetViewProps> = props =>
{
    const { columnCount = 5, ...rest } = props;
    const [ currentBadgeCode, setCurrentBadgeCode ] = useState<string>(null);
    const { currentOffer = null, setPurchaseOptions = null } = useCatalogContext();
    const { badgeCodes = [] } = useInventoryBadges();

    const previewStuffData = useMemo(() =>
    {
        if(!currentBadgeCode) return null;

        const stuffData = new StringDataType();

        stuffData.setValue([ '0', currentBadgeCode, '', '' ]);

        return stuffData;
    }, [ currentBadgeCode ]);

    useEffect(() =>
    {
        if(!currentOffer) return;

        setPurchaseOptions(prevValue =>
        {
            const newValue = { ...prevValue };

            newValue.extraParamRequired = true;
            newValue.extraData = ((previewStuffData && previewStuffData.getValue(1)) || null);
            newValue.previewStuffData = previewStuffData;

            return newValue;
        });
    }, [ currentOffer, previewStuffData, setPurchaseOptions ]);

    return (
        <AutoGrid columnCount={ columnCount } { ...rest }>
            { badgeCodes && (badgeCodes.length > 0) && badgeCodes.map((badgeCode, index) =>
            {
                return (
                    <LayoutGridItem key={ index } itemActive={ (currentBadgeCode === badgeCode) } onClick={ event => setCurrentBadgeCode(badgeCode) }> 
                        <LayoutBadgeImageView badgeCode={ badgeCode } />
                    </LayoutGridItem>
                );
            }) }
        </AutoGrid>
    );
}
