import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { LayoutGridItem } from '../../../../common/layout/LayoutGridItem';
import { Text } from '../../../../common/Text';
import { ICatalogNode } from '../../common/ICatalogNode';
import { useCatalogContext } from '../../context/CatalogContext';
import { CatalogIconView } from '../catalog-icon/CatalogIconView';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationItemViewProps
{
    node: ICatalogNode;
}

export const CatalogNavigationItemView: FC<CatalogNavigationItemViewProps> = props =>
{
    const { node = null } = props;
    const { selectCatalogNode = null } = useCatalogContext();
    
    return (
        <>
            <LayoutGridItem column={ false } itemActive={ node.isActive } onClick={ event => selectCatalogNode(node) }>
                <CatalogIconView icon={ node.iconId } />
                <Text grow truncate>{ node.localization }</Text>
                { node.isBranch &&
                    <FontAwesomeIcon icon={ node.isOpen ? 'caret-up' : 'caret-down' } /> }
            </LayoutGridItem>
            { node.isOpen && node.isBranch &&
                <CatalogNavigationSetView node={ node } /> }
        </>
    );
}
