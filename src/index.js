import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';  // Corrigido aqui
import { gameData, createPlayer } from './game.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

const connections = [];

wss.on('connection', (ws) => {
    console.log('A new player connected');
    ws.id = 'G'+uuidv4();
    createPlayer(ws.id);
    console.log(gameData.players)
    connections.push(ws);

    ws.send(JSON.stringify({type: 'playerId', id: ws.id}))
    ws.send(JSON.stringify({type: 'gameState', gameData}))

    ws.on('message', (message) => {
        message = JSON.parse(message);
        if (message.type === 'control') {
            console.log('Received control message:', message);
            const player = gameData.players.find((player) => player.id === ws.id)
            if (player) player.direction = message.angle;
        } else {
            console.log('Unknown message type:', message)
        }
    })
   
    ws.on('close', () => {
        console.log('WebSocket connection closed');
        connections.splice(connections.indexOf(ws), 1);
        gameData.players.splice(gameData.players.indexOf(ws.id), 1)
    });
});

const updateClients = () => {
    const state = JSON.stringify({type: 'gameState', gameData});
    connections.forEach((ws) => {
        ws.send(state)
    });
}

setInterval(updateClients, 10)

server.listen(3140, () => {
    console.log('Server is running on port 3140');
});
