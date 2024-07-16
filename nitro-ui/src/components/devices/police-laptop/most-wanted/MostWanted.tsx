import { useEffect } from "react";
import { Text } from "../../../../common";
import { useWantedList } from "../../../../hooks/roleplay/use-wanted-list"
import { WantedListAddUser } from "../../../../api/roleplay/police/WantedListAddUser";

export function MostWanted() {
    const bounties = useWantedList();
    useEffect(() => {
        WantedListAddUser('Chris', 'bad stuff');
    }, []);
    return (
        <>
            {
                bounties.map(_ => (
                    <Text variant="white">{_.username} - {_.crime}</Text>
                ))
            }
        </>
    )
}