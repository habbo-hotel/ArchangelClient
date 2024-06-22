import { NavigatorSearchResultList } from '@nitro-rp/renderer';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { LocalizeText, } from '../../../../api';
import { Column, Flex, Grid, Text } from '../../../../common';
import { NavigatorSearchResultItemView } from './NavigatorSearchResultItemView';

export interface NavigatorSearchResultViewProps {
    searchResult: NavigatorSearchResultList;
    taxiFee: number;
}

export function NavigatorSearchResultView({ searchResult, taxiFee }: NavigatorSearchResultViewProps) {
    const [isExtended, setIsExtended] = useState(true);

    const getResultTitle = () => {
        let name = searchResult.code;

        if (!name || !name.length || LocalizeText('navigator.searchcode.title.' + name) == ('navigator.searchcode.title.' + name)) return searchResult.data;

        if (name.startsWith('${')) return name.slice(2, (name.length - 1));

        return ('navigator.searchcode.title.' + name);
    }

    return (
        <Column className="bg-white rounded border border-muted" gap={0}>
            <Flex fullWidth alignItems="center" justifyContent="between" className="px-2 py-1">
                <Flex grow pointer alignItems="center" gap={1} onClick={event => setIsExtended(prevValue => !prevValue)}>
                    {isExtended && <FaMinus className="text-secondary fa-icon" />}
                    {!isExtended && <FaPlus className="text-secondary fa-icon" />}
                    <Text>{LocalizeText(getResultTitle())}</Text>
                </Flex>
            </Flex>
            {isExtended &&
                <Grid columnCount={1} className="navigator-grid" gap={0}>
                    {searchResult.rooms.length > 0 && searchResult.rooms.map((room, index) => <NavigatorSearchResultItemView key={index} roomData={room} taxiFee={taxiFee} />)}
                </Grid>
            }
        </Column>
    );
}
