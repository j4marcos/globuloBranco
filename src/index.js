import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';  // Corrigido aqui

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('A new client connected');
   
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

server.listen(3140, () => {
    console.log('Server is running on port 3140');
});
