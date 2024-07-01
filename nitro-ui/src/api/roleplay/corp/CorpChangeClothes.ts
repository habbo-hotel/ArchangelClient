export function corpChangeClothes(figure: string, uniform: string) {
    const oldParts = figure.split(".");
    const newParts = uniform.split(".");

    const prefixesToCheck = ["lg-", "sh-", "ha-", "wa-", "hr-"];

    for (let i = 0; i < oldParts.length && i < newParts.length; i++) {
        for (const prefix of prefixesToCheck) {
            if (oldParts[i].startsWith(prefix)) {
                oldParts[i] = newParts[i];
                break;
            }
        }
    }

    return oldParts.join(".");

}