import { FC, useEffect, useState } from 'react';
import { GetSessionDataManager, LocalizeText, WiredFurniType, WiredSelectionVisualizer } from '../../../api';
import { Button, Column, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../common';
import { BatchUpdates } from '../../../hooks';
import { useWiredContext } from '../WiredContext';
import { WiredFurniSelectorView } from './WiredFurniSelectorView';

export interface WiredBaseViewProps
{
    wiredType: string;
    requiresFurni: number;
    hasSpecialInput: boolean;
    save: () => void;
    validate?: () => boolean;
}

export const WiredBaseView: FC<WiredBaseViewProps> = props =>
{
    const { wiredType = '', requiresFurni = WiredFurniType.STUFF_SELECTION_OPTION_NONE, save = null, validate = null, children = null, hasSpecialInput = false } = props;
    const [ wiredName, setWiredName ] = useState<string>(null);
    const [ wiredDescription, setWiredDescription ] = useState<string>(null);
    const [ needsSave, setNeedsSave ] = useState<boolean>(false);
    const { trigger = null, setTrigger = null, setIntParams = null, setStringParam = null, setFurniIds = null, saveWired = null } = useWiredContext();

    const close = () => setTrigger(null);
    
    const onSave = () =>
    {
        if(validate && !validate()) return;

        if(save) save();

        setNeedsSave(true);
    }

    useEffect(() =>
    {
        if(!needsSave) return;

        saveWired();

        setNeedsSave(false);
    }, [ needsSave, saveWired ]);

    useEffect(() =>
    {
        if(!trigger) return;

        const spriteId = (trigger.spriteId || -1);
        const furniData = GetSessionDataManager().getFloorItemData(spriteId);

        BatchUpdates(() =>
        {
            if(!furniData)
            {
                setWiredName(('NAME: ' + spriteId));
                setWiredDescription(('NAME: ' + spriteId));
            }
            else
            {
                setWiredName(furniData.name);
                setWiredDescription(furniData.description);
            }

            if(hasSpecialInput)
            {
                setIntParams(trigger.intData);
                setStringParam(trigger.stringData);
            }
            
            if(requiresFurni > WiredFurniType.STUFF_SELECTION_OPTION_NONE)
            {
                setFurniIds(prevValue =>
                {
                    if(prevValue && prevValue.length) WiredSelectionVisualizer.clearSelectionShaderFromFurni(prevValue);
    
                    if(trigger.selectedItems && trigger.selectedItems.length)
                    {
                        WiredSelectionVisualizer.applySelectionShaderToFurni(trigger.selectedItems);
    
                        return trigger.selectedItems;
                    }
    
                    return [];
                });
            }
        });

        return () =>
        {
            BatchUpdates(() =>
            {
                setNeedsSave(false);
                setIntParams([]);
                setStringParam(null);
                setFurniIds(prevValue =>
                {
                    if(prevValue && prevValue.length) WiredSelectionVisualizer.clearSelectionShaderFromFurni(prevValue);

                    return [];
                });
            });
        }
    }, [ trigger, hasSpecialInput, requiresFurni, setIntParams, setStringParam, setFurniIds ]);

    return (
        <NitroCardView uniqueKey="nitro-wired" className="nitro-wired" theme="primary-slim">
            <NitroCardHeaderView headerText={ LocalizeText('wiredfurni.title') } onCloseClick={ close } />
            <NitroCardContentView>
                <Column gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <i className={ `icon icon-wired-${ wiredType }` } />
                        <Text bold>{ wiredName }</Text>
                    </Flex>
                    <Text small>{ wiredDescription }</Text>
                </Column>
                { !!children && <hr className="m-0 bg-dark" /> }
                { children }
                { (requiresFurni > WiredFurniType.STUFF_SELECTION_OPTION_NONE) &&
                    <>
                        <hr className="m-0 bg-dark" />
                        <WiredFurniSelectorView />
                    </> }
                <Flex alignItems="center" gap={ 1 }>
                    <Button fullWidth variant="success" onClick={ onSave }>{ LocalizeText('wiredfurni.ready') }</Button>
                    <Button fullWidth variant="secondary" onClick={ close }>{ LocalizeText('cancel') }</Button>
                </Flex>
            </NitroCardContentView>
        </NitroCardView>
    );
}
