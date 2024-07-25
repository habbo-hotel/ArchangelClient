import { useState } from "react";
import { Flex, Text } from "../../../../common";
import { useWantedList } from "../../../../hooks/roleplay/use-wanted-list"
import { WantedListAddUser } from "../../../../api/roleplay/police/WantedListAddUser";
import { Button } from "react-bootstrap";
import { FaCaretLeft, FaPlusCircle, FaPlusSquare, FaTimes } from "react-icons/fa";
import { UserSelect } from "../../../roleplay/UserSelect";
import { RoomUsersListRow } from "@nitro-rp/renderer";
import { CrimeSelect } from "../../../roleplay/CrimeSelect";
import { Crime } from "../../../../api/roleplay/police/GetCrimes";
import { WantedListRemoveUser } from "../../../../api/roleplay/police/WantedListRemoveUser";

export interface MostWantedProps {
    goBack(): void;
}

export function MostWanted({ goBack }: MostWantedProps) {
    const bounties = useWantedList();
    const [adding, setAdding] = useState(false);
    const [crime, setCrime] = useState<Crime>();
    const [user, setUser] = useState<RoomUsersListRow>();

    function onCancel() {
        setAdding(false);
        setCrime(undefined);
        setUser(undefined);
    }

    function onAddUser() {
        if (!user || !crime) {
            return;
        }
        WantedListAddUser(user.username, crime.crime);
        onCancel();
    }

    if (adding) {
        return (
            <>
                <Text bold fontSize={4}>Add to wanted list</Text>
                <br />
                <Flex center column style={{ gap: 10, padding: 16 }}>
                    <Flex column fullWidth>
                        <Text bold fontSize={6}>Suspect</Text>
                        <UserSelect userID={user?.id} onChange={setUser} />
                    </Flex>
                    <Flex column fullWidth>
                        <Text bold fontSize={6}>Crime</Text>
                        <CrimeSelect crime={crime?.crime} onChange={setCrime} />
                    </Flex>
                    <Flex fullWidth justifyContent="end" gap={2}>
                        <Button variant="dark" size="sm" onClick={onCancel}>
                            <FaTimes style={{ marginRight: 8 }} />
                            <Text fontSize={6} variant="white">Cancel</Text>
                        </Button>
                        <Button variant="success" size="sm" onClick={onAddUser}>
                            <FaPlusCircle style={{ marginRight: 8 }} />
                            <Text fontSize={6} variant="white">Add Suspect</Text>
                        </Button>
                    </Flex>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Flex justifyContent="between">
                <Flex center>
                    <FaCaretLeft onClick={goBack} style={{ color: 'black', cursor: 'pointer', fontSize: 24, marginRight: 4 }} />
                    <Text bold fontSize={4}>Wanted List</Text>
                </Flex>
                <Flex center>
                    <Button variant="success" size="sm" onClick={() => setAdding(true)}>
                        <FaPlusSquare style={{ marginRight: 8 }} />
                        <Text fontSize={6} variant="white">Add</Text>
                    </Button>
                </Flex>
            </Flex>
            <br />
            <table className="table table-striped table-sm table-text-small text-black m-0">
                <tbody>
                    <tr>
                        <th>Suspect</th>
                        <th>Crime</th>
                        <th>Jail Time</th>
                        <th>Added By</th>
                        <th>Actions</th>
                    </tr>
                    {
                        bounties.map(bounty => (
                            <tr key={`bounty_${bounty.userId}`}>
                                <td>
                                    <Text bold underline pointer>
                                        {bounty.username}
                                    </Text>
                                </td>
                                <td>
                                    <Text>
                                        {bounty.crime}
                                    </Text>
                                </td>
                                <td>
                                    <Text>
                                        10 mins
                                    </Text>
                                </td>
                                <td>
                                    <Text bold underline pointer>
                                        bob
                                    </Text>
                                </td>
                                <td>
                                    <Text underline pointer onClick={() => WantedListRemoveUser(bounty.username, bounty.crime)}>
                                        Remove
                                    </Text>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}