const express = require('express');
let app = express();
const http = require('http');
const server = http.Server(app);
const { Server } = require('socket.io');
const io = new Server(server);

// app.set('view engine', 'ejs);

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../client/dist/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


let PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});