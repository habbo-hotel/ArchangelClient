import { useEffect, useState } from "react";
import { Flex, Text } from "../../../../common";

const VIDEO_ID = 'trxczrcgTNM';
const STARTS_AT = 80;

export function ArchangelAboutPanel() {
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(false);
        }, 4500); // Hide text after 2 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <>
            <Flex column gap={2}>
                <Text bold fontSize={4} variant="white">About</Text>
                <Text fontSize={5} variant="white">
                    <b>Archangel</b> is a custom game engine built by <a href="https://github.com/HabboCodes" target="_blank">LeChris</a>.  It's forked off Nitro and MS4 with extensive modifications to provide the most comphrensive roleplay suite yet spanning hundreds of features.
                </Text>
                <Text bold fontSize={4} variant="white">Version</Text>
                <Text fontSize={5} variant="white">0.06</Text>
            </Flex >
            <br />
            <Flex gap={4}>
                <img src="https://i.imgur.com/yB5fDBY.png" style={{ height: 315, objectFit: 'cover' }} />
                <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${STARTS_AT}&controls=0&modestbranding=1&showinfo=0`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                    {showText && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 60, backgroundColor: 'red', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text>LeChris will destroy the bad coders</Text>
                        </div>
                    )}
                </div>
            </Flex>
        </>
    );
}
