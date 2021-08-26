import { FrontPageItem } from '@nitrots/nitro-renderer';
import { FC, useCallback, useMemo } from 'react';
import { CreateLinkEvent, GetConfiguration } from '../../../../../../api';
import { GetCatalogPageText } from '../../../../common/CatalogUtilities';
import { CatalogRedeemVoucherView } from '../../redeem-voucher/CatalogRedeemVoucherView';
import { CatalogLayoutFrontpage4ViewProps } from './CatalogLayoutFrontpage4View.types';

export const CatalogLayoutFrontpage4View: FC<CatalogLayoutFrontpage4ViewProps> = props =>
{
    const { pageParser = null } = props;

    const imageLibraryUrl = useMemo(() =>
    {
        console.log(pageParser);
        return GetConfiguration<string>('image.library.url');
    }, []);

    const selectItem = useCallback((item: FrontPageItem) =>
    {
        switch(item.type)
        {
            case FrontPageItem.ITEM_CATALOGUE_PAGE:
                CreateLinkEvent(`catalog/open/${ item.catalogPageLocation }`);
                return;
            case FrontPageItem.ITEM_PRODUCT_OFFER:
                CreateLinkEvent(`catalog/open/${ item.productOfferId }`);
                return;
        }
    }, []);

    if(!pageParser) return null;

    return (
        <div className="row h-100 nitro-catalog-layout-frontpage4">
            <div className="col-4">
                { pageParser.frontPageItems[0] &&
                    <div className="front-page-item h-100" style={ { backgroundImage: `url('${ imageLibraryUrl }${ pageParser.frontPageItems[0].itemPromoImage }')` }} onClick={ event => selectItem(pageParser.frontPageItems[0]) }>
                        <div className="front-page-item-caption">{ pageParser.frontPageItems[0].itemName }</div>
                    </div> }
            </div>
            <div className="d-flex col-8 flex-column">
                { pageParser.frontPageItems[1] &&
                    <div className="front-page-item h-100 mb-2" style={ { backgroundImage: `url('${ imageLibraryUrl }${ pageParser.frontPageItems[1].itemPromoImage }')` }} onClick={ event => selectItem(pageParser.frontPageItems[1]) }>
                        <div className="front-page-item-caption">{ pageParser.frontPageItems[1].itemName }</div>
                    </div> }
                { pageParser.frontPageItems[2] &&
                    <div className="front-page-item h-100 mb-2" style={ { backgroundImage: `url('${ imageLibraryUrl }${ pageParser.frontPageItems[2].itemPromoImage }')` }} onClick={ event => selectItem(pageParser.frontPageItems[2]) }>
                        <div className="front-page-item-caption">{ pageParser.frontPageItems[2].itemName }</div>
                    </div> }
                { pageParser.frontPageItems[3] &&
                    <div className="front-page-item h-100" style={ { backgroundImage: `url('${ imageLibraryUrl }${ pageParser.frontPageItems[3].itemPromoImage }')` }} onClick={ event => selectItem(pageParser.frontPageItems[3]) }>
                        <div className="front-page-item-caption">{ pageParser.frontPageItems[3].itemName }</div>
                    </div> }
                <CatalogRedeemVoucherView text={ GetCatalogPageText(pageParser, 1) } />
            </div>
        </div>
    );
}
