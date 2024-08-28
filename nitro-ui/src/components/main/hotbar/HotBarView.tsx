import { SyntheticEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { Base, Flex } from "../../../common";
import { CreateLinkEvent, GetRoomEngine } from "../../../api";
import { useHotBar } from "../../../hooks/roleplay/use-hotbar";
import { DeviceOpen } from "../../../api/roleplay/device/DeviceOpen";
import { HotBarPickupItem } from "../../../api/roleplay/items/HotBarPickupItem";

export function HotBarView() {
    const items = useHotBar();

    function onPickup(event: SyntheticEvent, itemID: number) {
        event.stopPropagation();
        HotBarPickupItem(itemID)
    }

    return (
        <Flex alignItems="center" justifyContent="between" gap={2} className="nitro-hotbar">
            <Flex center fullWidth>
                <div className="hotbar glass-panel ">
                    {
                        Array.from(new Array(12)).map((_, i) => {
                            const item = items[i]
                            const iconURL = item?.spriteId && GetRoomEngine().getFurnitureFloorIconUrl(item.spriteId);
                            return (
                                <div className="hotbar-slot" key={`hotbar-item_${i}`} onClick={() => item ? DeviceOpen(item.id) : CreateLinkEvent('inventory/toggle')}>
                                    {
                                        item && (
                                            <>
                                                <div className="hotbar-remove" onClick={e => onPickup(e, item.id)}>
                                                    <FaTimes />
                                                </div>
                                                <Base fit className="unique-bg-override" style={{ backgroundImage: `url(${iconURL})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                                            </>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </Flex>
        </Flex>
    )
}
