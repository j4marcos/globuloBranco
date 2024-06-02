import express from 'express';

const server = express();

server.use(express.static('public'));

server.get('/', (req, res) => {
    res.send('Hello World');
});



export { server }