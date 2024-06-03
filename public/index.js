const ws = new WebSocket(window.location.href.replace("http", "ws"));
import {createControl} from "./input.js";
import { renderGame } from "./render.js";

ws.addEventListener("connected", (e) => {
    console.log("Connected to the server");
    });
    createControl();

ws.addEventListener("message", (message) => {
    message = JSON.parse(message.data);
    if (message.type === "gameState") {
        renderGame(message.gameData);
    } else {
        console.log("Unknown message type:", message);
    }
}
);

export const sendDirection = (angle) => {
    if (ws.readyState === ws.OPEN)
    ws.send(JSON.stringify({ type: "control", angle }));
}

