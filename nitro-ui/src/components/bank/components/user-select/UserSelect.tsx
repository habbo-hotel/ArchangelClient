import { ChangeEvent, useEffect, useState } from "react";
import { useMessageEvent } from "../../../../hooks";
import { RoomListUsersEvent, RoomUsersListRow } from "@nitro-rp/renderer";
import { RoomListUsers } from "../../../../api/roleplay/room/RoomListUsers";

export interface UserSelectProps {
    userID?: number;
    onChange(newUser: any): void;
}

export function UserSelect({ userID, onChange }: UserSelectProps) {
    const [users, setUsers] = useState<Array<RoomUsersListRow>>([]);

    useEffect(() => {
        RoomListUsers();
    }, []);

    useMessageEvent<RoomListUsersEvent>(RoomListUsersEvent, event => {
        setUsers(event.getParser().users);
    });

    function onChangeUser(event: ChangeEvent<HTMLSelectElement>) {
        const matchingUser = users.find(_ => _.id === Number(event.currentTarget.value));
        if (!matchingUser) {
            return;
        }
        onChange(matchingUser);
    }

    return (
        <select style={{ width: '100%', padding: 14 }} value={userID} onChange={onChangeUser}>
            {
                users.map(user => (
                    <option key={`user_${user.id}`} value={user.id}>
                        {user.username}
                    </option>
                ))
            }
        </select>
    )
}