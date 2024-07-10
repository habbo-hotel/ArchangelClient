import { Dispose, DropBounce, EaseOut, JumpBy, Motions, NitroToolbarAnimateIconEvent, Queue, Wait } from '@nitro-rp/renderer';
import { CreateLinkEvent } from '../../api';
import { Base, Column, Flex, Grid, LayoutItemCountView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useInventoryUnseenTracker, useRoomEngineEvent } from '../../hooks';
import { HOTEL_NAME } from '../../constant';
import { useState } from 'react';

export function ToolbarView() {
    const { getFullCount = 0 } = useInventoryUnseenTracker();
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    useRoomEngineEvent<NitroToolbarAnimateIconEvent>(NitroToolbarAnimateIconEvent.ANIMATE_ICON, event => {
        const animationIconToToolbar = (iconName: string, image: HTMLImageElement, x: number, y: number) => {
            const target = (document.body.getElementsByClassName(iconName)[0] as HTMLElement);
            if (!target) return;

            image.className = 'toolbar-icon-animation';
            image.style.visibility = 'visible';
            image.style.left = (x + 'px');
            image.style.top = (y + 'px');

            document.body.append(image);

            const targetBounds = target.getBoundingClientRect();
            const imageBounds = image.getBoundingClientRect();

            const left = (imageBounds.x - targetBounds.x);
            const top = (imageBounds.y - targetBounds.y);
            const squared = Math.sqrt(((left * left) + (top * top)));
            const wait = (500 - Math.abs(((((1 / squared) * 100) * 500) * 0.5)));
            const height = 20;

            const motionName = (`ToolbarBouncing[${iconName}]`);

            if (!Motions.getMotionByTag(motionName)) {
                Motions.runMotion(new Queue(new Wait((wait + 8)), new DropBounce(target, 400, 12))).tag = motionName;
            }

            const motion = new Queue(new EaseOut(new JumpBy(image, wait, ((targetBounds.x - imageBounds.x) + height), (targetBounds.y - imageBounds.y), 100, 1), 1), new Dispose(image));

            Motions.runMotion(motion);
        }

        animationIconToToolbar('icon-inventory', event.image, event.x, event.y);
    });

    return (
        <>
            <Flex alignItems="center" justifyContent="between" gap={2} className="nitro-toolbar py-1 px-3">
                <Flex gap={2} alignItems="center" style={{ flex: 1, width: '100%' }}>
                    <Flex alignItems="center" gap={2}>
                        <Base pointer className="navigation-item icon icon-rooms" onClick={event => CreateLinkEvent('navigator/toggle')} />
                        <Base pointer className="navigation-item icon icon-catalog" onClick={event => CreateLinkEvent('catalog/toggle')} />
                        <Base pointer className="navigation-item icon icon-inventory" onClick={event => CreateLinkEvent('inventory/toggle')}>
                            {(getFullCount > 0) &&
                                <LayoutItemCountView count={getFullCount} />}
                        </Base>
                    </Flex>
                    <Flex alignItems="center" id="toolbar-chat-input-container" style={{ flex: 1, width: '100%' }} />
                </Flex>
                <Flex alignItems="center" id="toolbar-copyright-input-container">
                    <Text bold fontSize={4} variant="white" onClick={() => setIsAboutVisible(true)} style={{ cursor: 'pointer' }}>{HOTEL_NAME}</Text>
                </Flex>
            </Flex>
            {
                isAboutVisible && (
                    <NitroCardView uniqueKey="aboutArchangel" className="nitro-inventory" style={{ height: 300 }}>
                        <NitroCardHeaderView headerText="Archangel" onCloseClick={() => setIsAboutVisible(false)} />
                        <NitroCardContentView>
                            <Grid>
                                <Column size={6}>
                                    <div style={{ width: 250, height: 250, background: 'url(https://i.imgur.com/JhaH0AQ.png)', backgroundSize: 'cover', borderRadius: 8 }} />
                                </Column>
                                <Column size={6}>
                                    <div>
                                        <Text fontSize={5}>By</Text>
                                        <div style={{ marginBottom: -10 }} />
                                        <Text bold fontSize={1}>LeChris</Text>
                                        <br />
                                        <a href="https://github.com/HabboCodes" target="_blank">
                                            <Text fontSize={5}>
                                                https://github.com/HabboCodes
                                            </Text>
                                        </a>
                                        <iframe
                                            width="0"
                                            height="0"
                                            src="https://www.youtube.com/embed/63FjrdZZfp4?si=SKUuax2IypeOeIsU&autoplay=1&start=31"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        />
                                    </div>
                                    <div style={{ height: '100%', alignContent: 'flex-end' }}>
                                        <Text bold fontSize={5}>
                                            The reason the Son of God appeared was to destroy the devil’s work.
                                        </Text>
                                    </div>
                                </Column>
                            </Grid>
                        </NitroCardContentView>
                    </NitroCardView >
                )
            }
        </>
    );
}
