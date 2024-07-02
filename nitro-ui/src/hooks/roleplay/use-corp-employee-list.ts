import { CorpEmployeeData, CorpEmployeeListEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../events";
import { useEffect, useState } from "react";
import { CorpEmployeeList } from "../../api/roleplay/corp/CorpEmployeeList";

export function useCorpEmployeeList(corpID: number): CorpEmployeeData[] {
    const [corpEmployees, setCorpEmployees] = useState<CorpEmployeeData[]>([]);

    useEffect(() => {
        CorpEmployeeList(corpID);
    }, [corpID]);

    useMessageEvent<CorpEmployeeListEvent>(CorpEmployeeListEvent, event => {
        const parser = event.getParser();
        if (parser.corpID !== corpID) {
            return;
        }
        setCorpEmployees(parser.corpEmployees);
    })

    return corpEmployees
}