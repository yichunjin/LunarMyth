const express = require('express');
let app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const {v4: uuidV4} = require('uuid');
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../client/dist');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));


app.get('/', (req, res)=>{
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('index', { roomId: req.params.room });
});


io.on('connection', socket => {
  socket.on('join-room', (roomId, userId, userName) => {
    console.log(roomId, userId);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', message, userName);
    });
  });
});


let PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});