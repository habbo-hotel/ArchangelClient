import { useMessageEvent } from "../../../hooks";
import { NitroConfiguration, WeaponActionEvent } from "@nitro-rp/renderer";

export function WeaponEffects() {
    useMessageEvent<WeaponActionEvent>(WeaponActionEvent, event => {
        const soundBaseURL = NitroConfiguration.getValue<string>('sounds.url');

        const weaponSound = new Audio(soundBaseURL.replace('%sample%', `weapons/${event.getParser().uniqueName}/single`));

        console.log(event.getParser().soundLevel)

        weaponSound.volume = event.getParser().soundLevel;

        weaponSound.play()
    });

    return null;
}