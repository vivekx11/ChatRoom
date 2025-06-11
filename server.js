const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // Serve static files from /public

io.on('connection', socket => {
  socket.on('joinRoom', room => {
    socket.join(room);
  });

  socket.on('chatMessage', ({ roomCode, name, message }) => {
    io.to(roomCode).emit('message', `${name}: ${message}`);
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
