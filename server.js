const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.set('trust proxy', 2);

app.use(express.static(path.resolve(`${__dirname}/client`)));

io.on('connection', (socket) => {
    console.log('Connect');

    socket.on('disconnect', () => console.log('Disconnect'));

    socket.on('echo', (data, cb) => cb(data));

    socket.on('syn', (cb) => socket.emit('ack'));
    
    socket.on('bcast', (msg) => {
        io.emit('bcasted', msg);
    });
});

http.listen(port, () => console.log(`Listening on port ${port}`));