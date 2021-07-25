import { ICatalogPageData } from 'nitro-renderer';
import { Dispatch, SetStateAction } from 'react';

export interface CatalogNavigationViewProps
{
    page: ICatalogPageData;
    pendingTree: ICatalogPageData[];
    setPendingTree: Dispatch<SetStateAction<ICatalogPageData[]>>;
}
