import { ChangeEvent } from "react";
import { CorpListData } from "@nitro-rp/renderer";
import { useCorpList } from "../../hooks/roleplay/use-corp-list";

export interface CorpSelectProps {
    corpID: number;
    onChange(newCorp: CorpListData): void;
}

export function CorpSelect({ corpID, onChange }: CorpSelectProps) {
    const corps = useCorpList();

    function onChangeCorp(event: ChangeEvent<HTMLSelectElement>) {
        const matchingCorp = corps.find(_ => _.id === Number(event.currentTarget.value));
        if (!matchingCorp) {
            return;
        }
        onChange(matchingCorp);
    }

    return (
        <select style={{ width: '100%', padding: 14 }} value={corpID} onChange={onChangeCorp}>            {
            !corpID && <option selected disabled>Select a corp</option>
        }
            {
                corps.map(corp => (
                    <option key={`corp_${corp.id}`} value={corp.id}>
                        {corp.name}
                    </option>
                ))
            }
        </select>
    )
}