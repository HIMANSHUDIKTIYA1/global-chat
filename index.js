//node server 
 
const io= require('socket.io')(process.env.PORT||8000, {
    cors:{
        origin: "https://glob-chat.netlify.app/"
    }
});

const users = {};
// git init
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/HIMANSHUDIKTIYA1/global-chat.git
// git push -u origin main

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });

    socket.on('send', message =>{
        socket.broadcast.emit(`receive`, {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit(`left`, users[socket.id])
        delete users[socket.id];
    });
});
