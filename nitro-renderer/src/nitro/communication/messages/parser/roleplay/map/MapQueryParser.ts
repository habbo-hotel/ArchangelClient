import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface MapData {
    id: number;
    name: string;
    x: number;
    y: number;
    maxX: number;
    maxY: number;
}

export interface RoadData {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export interface SpecialPointData {
    x: number;
    y: number;
    label: string;
}

export interface IslandData {
    name: string;
    rooms: MapData[];
    roads: RoadData[];
    specialPoints: SpecialPointData[];
}

export class MapQueryParser implements IMessageParser {
    private _islands: IslandData[];

    public flush(): boolean {
        this._islands = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        try {
            const islandCount = wrapper.readInt();
            const islands: IslandData[] = [];

            for (let i = 0; i < islandCount; i++) {
                const islandName = wrapper.readString();
                const roomDataRaw = wrapper.readString();
                const roadDataRaw = wrapper.readString();
                const specialPointsRaw = wrapper.readString();

                // Parse rooms
                const rooms: MapData[] = roomDataRaw
                    .split('|')
                    .map(roomString => {
                        const roomData = roomString.split(';');
                        return {
                            id: parseInt(roomData[0], 10),
                            name: roomData[1],
                            x: parseInt(roomData[2], 10),
                            y: parseInt(roomData[3], 10),
                            maxX: parseInt(roomData[4], 10),
                            maxY: parseInt(roomData[5], 10),
                        };
                    });

                // Parse roads
                const roads: RoadData[] = roadDataRaw
                    .split('|')
                    .filter(roadString => roadString.trim() !== '')
                    .map(roadString => {
                        const roadData = roadString.split(';');
                        return {
                            startX: parseInt(roadData[0], 10),
                            startY: parseInt(roadData[1], 10),
                            endX: parseInt(roadData[2], 10),
                            endY: parseInt(roadData[3], 10),
                        };
                    });

                // Parse special points
                const specialPoints: SpecialPointData[] = specialPointsRaw
                    .split('|')
                    .filter(pointString => pointString.trim() !== '')
                    .map(pointString => {
                        const pointData = pointString.split(';');
                        return {
                            x: parseInt(pointData[0], 10),
                            y: parseInt(pointData[1], 10),
                            label: pointData[2],
                        };
                    });

                islands.push({
                    name: islandName,
                    rooms,
                    roads,
                    specialPoints,
                });
            }

            this._islands = islands;
        } catch (e) {
            console.error('MapQueryParser.parse error:', e);
            return false;
        }

        return true;
    }

    public get islands(): IslandData[] {
        return this._islands;
    }
}
