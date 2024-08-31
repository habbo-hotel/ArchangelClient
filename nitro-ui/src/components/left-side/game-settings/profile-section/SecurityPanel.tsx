import { Column, Grid, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";

export function SecurityPanel() {
    return (
        <>
            <NitroCardAccordionView fullHeight overflow="hidden">
                <NitroCardAccordionSetView headerText="Password" isExpanded>
                    hello world
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Two Step Authentication">
                    <Text fontSize={5}>I don't own anything because am broke</Text>
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Email Address">
                    <Text fontSize={5}>I don't own anything because am broke</Text>
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Login Attempts">
                    <Text fontSize={5}>I don't own anything because am broke</Text>
                </NitroCardAccordionSetView>
            </NitroCardAccordionView>
        </>
    )
}