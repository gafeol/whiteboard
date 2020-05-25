const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const onConnection = socket => {
    console.log("new user connected");
    socket.on('drawing', data => socket.broadcast.emit('drawing', data));
};

io.on('connection', onConnection);

http.listen(port, () => console.log("Listening on port " + port));