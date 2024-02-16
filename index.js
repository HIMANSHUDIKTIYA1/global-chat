const express = require('express'); // You might already have this
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    socket.broadcast.emit(`receive`, {
      message,
      name: users[socket.id],
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit(`left`, users[socket.id]);
    delete users[socket.id];
  });
});

// Listen on the Port from environment variable or default to 8000
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//node server 










