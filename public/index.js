const ws = new WebSocket('ws://localhost:3140');

ws.addEventListener('message', (message) => console.log('Received message:', message));