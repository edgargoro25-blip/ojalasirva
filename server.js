const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('Jugador conectado');
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send-score', (data) => {
    socket.to(data.roomId).emit('opponent-data', data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log('Servidor en puerto ' + PORT);
});

