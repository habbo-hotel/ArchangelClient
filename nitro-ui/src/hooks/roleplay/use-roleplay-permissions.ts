import { useEffect, useState } from "react";
import { RoleplayPermissionsData, RoleplayPermissionsEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../events";
import { RoleplayPermissionsQuery } from "../../api/roleplay/user/RoleplayPermissionsQuery";

export function useRoleplayPermissions(): RoleplayPermissionsData {
    const [permissions, setPermissions] = useState<RoleplayPermissionsData>({
        canSeeAllRooms: false,
    })

    useEffect(() => {
        setPermissions({
            canSeeAllRooms: false,
        })
        RoleplayPermissionsQuery()
    }, []);

    useMessageEvent<RoleplayPermissionsEvent>(RoleplayPermissionsEvent, event => {
        const eventData: RoleplayPermissionsData = event.getParser().data;
        setPermissions(eventData);
    });

    return permissions;
}