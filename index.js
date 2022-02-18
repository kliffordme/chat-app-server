

const io = require('socket.io')(4000, {
    cors : ['http://localhost:3000']
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
