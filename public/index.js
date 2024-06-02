const ws = new WebSocket("ws://localhost:3140");
import "./input.js";
import { initGame } from "./render.js";

ws.addEventListener("open", () => {
    console.log("Connected to the server");
    });

ws.addEventListener("message", (message) => {
    message = JSON.parse(message.data);
    if (message.type === "gameState") {
        initGame(message.gameData);
    } else {
        console.log("Unknown message type:", message);
    }
}
);

export const sendDirection = (angle) => {
    ws.send(JSON.stringify({ type: "control", angle }));
}

