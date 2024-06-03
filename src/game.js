import { updateClients } from "./index.js";

const mapWidth = 500;
const mapHeight = 500;

export const gameData = {
    map: { width: mapWidth, height: mapWidth, shape: "rectangle", bgcolor: "lightgray" },
    players: [],
    bacterias: [
        { x: Math.random() * mapWidth, y: Math.random() * mapHeight, size: 10, color: "yellow" },
        { x: Math.random() * mapWidth, y: Math.random() * mapHeight, size: 10, color: "orange" },
        { x: Math.random() * mapWidth, y: Math.random() * mapHeight, size: 10, color: "purple" },
    ],
    virus: [
        { x: Math.random() * mapWidth, y: Math.random() * mapHeight, size: 10, color: "black" },
        { x: Math.random() * mapWidth, y: Math.random() * mapHeight, size: 10, color: "white" },
        { x: Math.random() * mapWidth, y: Math.random() * mapHeight, size: 10, color: "gray" },
    ],
};

export const createPlayer = (id) => {
    gameData.players.push({
        id,
        x: Math.random() * mapWidth,
        y: Math.random() * mapHeight,
        size: 20,
        color: "white",
        direction: 0.50,
    })
}

setInterval(() => {
    gameData.players.forEach((player) => {
        player.x += Math.cos(player.direction) * 2;
        player.y += Math.sin(player.direction) * 2;

        if (player.x < 0) player.x = mapWidth;
        if (player.y < 0) player.y = mapHeight;
        if (player.x > mapWidth) player.x = 0;
        if (player.y > mapHeight) player.y = 0;
    });
    updateClients();
}, 10);