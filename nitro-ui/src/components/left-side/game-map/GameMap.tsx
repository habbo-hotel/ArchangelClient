import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function GameMap() {
    useEffect(() => {
        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -2,
        });

        // Define map dimensions and image bounds
        const mapWidth = 4096;
        const mapHeight = 4096;
        const imageBounds = [[0, 0], [mapHeight, mapWidth]];

        map.fitBounds(imageBounds);

        // Helper function to create rooms for an island
        const createIslandRooms = (startX, startY, roomSize) => {
            const rooms = [];
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 3; col++) {
                    const topLeft = [startY + row * roomSize, startX + col * roomSize];
                    const bottomRight = [topLeft[0] + roomSize, topLeft[1] + roomSize];
                    rooms.push({ bounds: [topLeft, bottomRight] });
                }
            }
            return rooms;
        };

        // Define islands with larger rooms
        const roomSize = 250; // Larger rooms
        const islands = [
            { name: 'Island 1', rooms: createIslandRooms(300, 700, roomSize) }, // Island 1
            { name: 'Island 2', rooms: createIslandRooms(1400, 400, roomSize) }, // Island 2
            { name: 'Island 3', rooms: createIslandRooms(2600, 1200, roomSize) }, // Island 3
        ];

        // Draw rooms for each island
        // Draw rooms for each island
        islands.forEach((island, index) => {
            island.rooms.forEach((room, roomIndex) => {
                // Draw the room rectangle
                L.rectangle(room.bounds, { color: 'blue', weight: 2, fillOpacity: 0.1 })
                    .addTo(map)
                    .bindPopup(`<b>${island.name} - Room ${roomIndex + 1}</b>`);

                // Calculate label position (bottom left of the room)
                const labelCoords = [
                    room.bounds[1][0] - 30, // Slightly above the bottom edge
                    room.bounds[0][1] + 40, // Slightly to the right of the left edge
                ];

                // Add room name as a label
                L.marker(labelCoords, {
                    icon: L.divIcon({
                        className: 'room-label',
                        html: `<div style="
                    font-size: 10px; 
                    color: white; 
                    text-align: center;">
                    Room ${roomIndex + 1}
                </div>`,
                    }),
                    interactive: false, // Disable interaction with the label
                }).addTo(map);
            });
        });

        // Add straight roads with 90-degree turns within each island
        islands.forEach(island => {
            const roads = [];
            // Horizontal roads
            const y1 = island.rooms[0].bounds[0][0] + roomSize / 2;
            const y2 = island.rooms[3].bounds[0][0] + roomSize / 2;
            const xStart = island.rooms[0].bounds[0][1] + roomSize / 2;
            const xEnd = island.rooms[2].bounds[0][1] + roomSize / 2;

            roads.push([[y1, xStart], [y1, xEnd]]); // Top horizontal
            roads.push([[y2, xStart], [y2, xEnd]]); // Bottom horizontal

            // Vertical roads
            const x1 = island.rooms[0].bounds[0][1] + roomSize / 2;
            const x2 = island.rooms[2].bounds[0][1] + roomSize / 2;
            const yStart = island.rooms[0].bounds[0][0] + roomSize / 2;
            const yEnd = island.rooms[3].bounds[0][0] + roomSize / 2;

            roads.push([[yStart, x1], [yEnd, x1]]); // Left vertical
            roads.push([[yStart, x2], [yEnd, x2]]); // Right vertical

            roads.forEach(road => {
                L.polyline(road, { color: 'gray', weight: 5 }).addTo(map);
            });
        });

        // Add causeways (roads connecting the islands)
        const causeways = [
            // Between Island 1 and Island 2
            {
                coords: [
                    [islands[0].rooms[4].bounds[1][0] - roomSize / 2, islands[0].rooms[4].bounds[1][1]], // Start from the center of Room 5 of Island 1
                    [islands[0].rooms[4].bounds[1][0] - roomSize / 2, islands[1].rooms[1].bounds[0][1]], // Move vertically toward Island 2
                    [islands[1].rooms[1].bounds[0][0] + roomSize / 2, islands[1].rooms[1].bounds[0][1]], // End at the center of Room 2 of Island 2
                ],
            },
            // Between Island 2 and Island 3
            {
                coords: [
                    [islands[1].rooms[4].bounds[1][0] - roomSize / 2, islands[1].rooms[4].bounds[1][1]], // Start from the center of Room 5 of Island 2
                    [islands[1].rooms[4].bounds[1][0] - roomSize / 2, islands[2].rooms[1].bounds[0][1]], // Move vertically toward Island 3
                    [islands[2].rooms[1].bounds[0][0] + roomSize / 2, islands[2].rooms[1].bounds[0][1]], // End at the center of Room 2 of Island 3
                ],
            },
        ];


        causeways.forEach(causeway => {
            L.polyline(causeway.coords, { color: 'gray', weight: 5 })
                .addTo(map)
                .bindPopup('<b>Causeway</b>');
        });

        // Add markers for special points (taxi stands, ATMs, etc.)
        const specialPoints = [
            { coords: [islands[0].rooms[1].bounds[0][0] + roomSize / 2, islands[0].rooms[1].bounds[0][1] + roomSize / 2], label: 'Taxi Stand (Island 1)' },
            { coords: [islands[1].rooms[1].bounds[0][0] + roomSize / 2, islands[1].rooms[1].bounds[0][1] + roomSize / 2], label: 'ATM (Island 2)' },
            { coords: [islands[2].rooms[4].bounds[0][0] + roomSize / 2, islands[2].rooms[4].bounds[0][1] + roomSize / 2], label: 'Special Point (Island 3)' },
        ];

        specialPoints.forEach(point => {
            L.circle(point.coords, {
                color: 'yellow',
                fillColor: 'yellow',
                fillOpacity: 0.8,
                radius: 10,
            })
                .addTo(map)
                .bindPopup(`<b>${point.label}</b>`);
        });


        // Add green dots (e.g., ATMs or specific markers)
        const greenDots = [
            { coords: [islands[0].rooms[0].bounds[0][0] + roomSize / 2, islands[0].rooms[0].bounds[0][1] + roomSize / 2], label: 'Green Dot 1' },
            { coords: [islands[1].rooms[3].bounds[0][0] + roomSize / 2, islands[1].rooms[3].bounds[0][1] + roomSize / 2], label: 'Green Dot 2' },
            { coords: [islands[2].rooms[5].bounds[0][0] + roomSize / 2, islands[2].rooms[5].bounds[0][1] + roomSize / 2], label: 'Green Dot 3' },
        ];

        greenDots.forEach(dot => {
            L.circle(dot.coords, {
                color: 'green',
                fillColor: 'green',
                fillOpacity: 0.8,
                radius: 10,
            })
                .addTo(map)
                .bindPopup(`<b>${dot.label}</b>`);
        });

        // Add blue dots (e.g., water points or teleport points)
        const blueDots = [
            { coords: [islands[0].rooms[1].bounds[0][0] + roomSize / 2, islands[0].rooms[1].bounds[0][1] + roomSize / 2], label: 'Blue Dot 1' },
            { coords: [islands[1].rooms[4].bounds[0][0] + roomSize / 2, islands[1].rooms[4].bounds[0][1] + roomSize / 2], label: 'Blue Dot 2' },
        ];

        blueDots.forEach(dot => {
            L.circle(dot.coords, {
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.8,
                radius: 10,
            })
                .addTo(map)
                .bindPopup(`<b>${dot.label}</b>`);
        });

        // Add red dots (e.g., danger points or special events)
        const redDots = [
            { coords: [islands[0].rooms[3].bounds[0][0] + roomSize / 2, islands[0].rooms[3].bounds[0][1] + roomSize / 2], label: 'Red Dot 1' },
            { coords: [islands[2].rooms[2].bounds[0][0] + roomSize / 2, islands[2].rooms[2].bounds[0][1] + roomSize / 2], label: 'Red Dot 2' },
        ];

        redDots.forEach(dot => {
            L.circle(dot.coords, {
                color: 'red',
                fillColor: 'red',
                fillOpacity: 0.8,
                radius: 10,
            })
                .addTo(map)
                .bindPopup(`<b>${dot.label}</b>`);
        });

        // Add white dots (e.g., neutral points or checkpoints)
        const whiteDots = [
            { coords: [islands[1].rooms[0].bounds[0][0] + roomSize / 2, islands[1].rooms[0].bounds[0][1] + roomSize / 2], label: 'White Dot 1' },
            { coords: [islands[2].rooms[0].bounds[0][0] + roomSize / 2, islands[2].rooms[0].bounds[0][1] + roomSize / 2], label: 'White Dot 2' },
        ];

        whiteDots.forEach(dot => {
            L.circle(dot.coords, {
                color: 'white',
                fillColor: 'white',
                fillOpacity: 0.8,
                radius: 10,
            })
                .addTo(map)
                .bindPopup(`<b>${dot.label}</b>`);
        });

        // Add a key/legend for the dots
        const legend = L.control({ position: 'bottomright' });

        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'info legend');
            div.innerHTML = `
        <h4>Key</h4>
        <i style="background: green; width: 10px; height: 10px; display: inline-block; margin-right: 5px;"></i> ATMs<br>
        <i style="background: blue; width: 10px; height: 10px; display: inline-block; margin-right: 5px;"></i>Teleports<br>
        <i style="background: red; width: 10px; height: 10px; display: inline-block; margin-right: 5px;"></i>Gang<br>
        <i style="background: white; width: 10px; height: 10px; display: inline-block; border: 1px solid black; margin-right: 5px;"></i>Player
    `;
            return div;
        };

        // Add the legend to the map
        legend.addTo(map);

    }, []);

    return <div id="map" className="glass-panel" />;
}