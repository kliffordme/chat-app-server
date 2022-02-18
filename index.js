
// const http = require('http')
const { createServer } = require("http");
const express = require('express');
const { Server } = require("socket.io");


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: 'https://epic-brattain-e4eeaf.netlify.app/'
});


app.get('/', (req, res) =>{
    res.send("app is running")
})

io.on('connection', (socket) => {

    socket.on('send', (msg, room) =>{

        if(room === ''){
            socket.broadcast.emit('receive', msg)
        }else{
            socket.to(room).emit('receive', msg)
        }
    })

    socket.on('join-room', (room, cb) =>{
        socket.join(room)
        cb(`You joined ${room}`)
    })
}); 


server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
