import { ChangeEvent } from "react";
import { Crime, useCrimes } from "../../api/roleplay/police/GetCrimes";

export interface CrimeSelectProps {
    crime: string;
    onChange(crime: Crime): void;
}

export function CrimeSelect({ crime, onChange }: CrimeSelectProps) {
    const crimeList = useCrimes();

    function onChangeCrime(event: ChangeEvent<HTMLSelectElement>) {
        const matchingCrime = crimeList.find(_ => _.crime === event.currentTarget.value);
        if (!matchingCrime) {
            return;
        }
        onChange(matchingCrime);
    }

    return (
        <select style={{ width: '100%', padding: 14 }} value={crime} onChange={onChangeCrime}>
            {
                !crime && <option selected disabled>Select a crime</option>
            }
            {
                crimeList.map(crime => (
                    <option key={`crime_${crime.crime}`} value={crime.crime}>
                        {crime.crime} ({crime.sentence} mins)
                    </option>
                ))
            }
        </select>
    )
}