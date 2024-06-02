export const gameData = {
    map: { width: 500, height: 500, shape: "rectangle", bgcolor: "lightgray" },
    globulos: [
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "red" },
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "blue" },
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "green" },
    ],
    bacterias: [
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "yellow" },
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "orange" },
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "purple" },
    ],
    virus: [
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "black" },
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "white" },
        { x: Math.random() * 500, y: Math.random() * 500, size: 10, color: "gray" },
    ],
};