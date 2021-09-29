const express = require('express');
const config = require('config');
const socket = require('socket.io');
const path=require('path');
const app = express();

const server = require('http').Server(app);
const io = socket(server);

const User = require('./models/User');
const Room = require('./models/Room');
const Message = require('./models/Message');

const store = require('./store');
//хранилище вынесено отдельно в store.js
const { rooms } = store.chat;

app.use(express.json());

io.on('connection', socket => {
    console.log('Socket has been planted:', socket.id);
    //Логин: проверяем валидность имени пользователя, если комната уже существует, 
    //то добавляем в нее пользователя и оповещаем об этом других пользователей комнаты,
    // если комнаты нет - создаем ее и оповещаем других пользователей о ее создании.
    socket.on('ROOM/JOIN_REQUEST', (data) => {
        try {
            const { userName, roomName } = data;
            if (!userName.length || userName.length > 16) {
                socket.emit('CHAT/NAME_WRONG_LENGTH');
                return;
            }
            const loggedUsers = [];
            rooms.forEach(room => {
                room.users.forEach(user => {
                    loggedUsers.push(user?.name)
                });
            });
            if (loggedUsers.includes(userName)) {
                socket.emit('CHAT/NAME_ALREADY_USED');
                return;
            }
            socket.join(roomName);
            const targetRoom = rooms.find(room => room.name === roomName) || (new Room(roomName, userName));
            if (!rooms.find(room => room.name === targetRoom.name)) {
                rooms.push(targetRoom);
                io.emit('ROOM/UPDATE_ROOMS', rooms.map(room => room.name));
            }
            const targetUsers = targetRoom.users;
            if (!targetUsers.find(user => user.socketId === socket.id)) {
                targetUsers.push(new User(userName, socket.id, roomName));
            } else {
                targetUsers.find(user => user.socketId === socket.id).name = userName;
            }
            socket.broadcast.to(roomName).emit('ROOM/UPDATE_USERS', targetRoom.users.map(user => user.name));
            socket.emit('ROOM/JOIN_RESPONSE',
                {
                    currentRoom: {
                        ...targetRoom,
                        users: targetUsers.map(user => user.name)
                    },
                    rooms: rooms.map(room => room.name),
                    userName: userName
                }
            );
        } catch (e) {
            socket.emit('CHAT/SOMETHING_WENT_WRONG');
        }

    });
    //новое сообщение: оповещаем клиентов комнаты о новом сообщении
    socket.on('ROOM/CLIENT_NEW_MESSAGE', (message) => {
        try {
            if (!message.length) {
                socket.emit('ROOM/EMPTY_MESSAGE');
                return;
            }
            const roomName = Array.from(socket.rooms)[1];
            const targetRoom = rooms.find(room => room.name === roomName);
            const userName = targetRoom.users.find(user => user.socketId === socket.id).name;
            const newMessage = new Message(userName, message);
            targetRoom.messages.push(newMessage);
            io.to(roomName).emit('ROOM/SERVER_NEW_MESSAGE', newMessage);
        } catch (e) {
            socket.emit('CHAT/SOMETHING_WENT_WRONG');
        }

    });
    //смена комнаты из списка уже существующих: отправляем пользователям новой и старой комнат обновленные списки пользователей.
    socket.on('CHAT/CHANGE_ROOM', (newRoomName) => {
        try {
            const oldRoomName = Array.from(socket.rooms)[1];
            const oldRoom = rooms.find(room => room.name === oldRoomName);
            const user = oldRoom.users.find(user => user.socketId === socket.id);
            oldRoom.users = oldRoom.users.filter(user => user.socketId !== socket.id);
            socket.broadcast.to(oldRoomName).emit('ROOM/UPDATE_USERS', oldRoom.users.map(user => user.name));
            socket.leave(oldRoomName);
            socket.join(newRoomName);
            const targetRoom = rooms.find(room => room.name === newRoomName);
            const targetUsers = targetRoom.users;
            targetUsers.push(user);
            socket.broadcast.to(newRoomName).emit('ROOM/UPDATE_USERS', targetRoom.users.map(user => user.name));
            socket.emit('ROOM/JOIN_RESPONSE',
                {
                    currentRoom: {
                        ...targetRoom,
                        users: targetUsers.map(user => user.name)
                    },
                    rooms: rooms.map(room => room.name),
                    userName: user.name
                });
        } catch (e) {
            socket.emit('CHAT/SOMETHING_WENT_WRONG');
        }
    });
    //создание новой комнаты: отправляем пользователям старой комнаты обновленный список пользователей, создаем новую комнату,
    // обновляем информацию о коннатах для всех пользователей
    socket.on('CHAT/CREATE_NEW_ROOM', (newRoomName) => {
        try {
            if (!newRoomName.length || newRoomName.length > 16) {
                socket.emit('CHAT/ROOM_NAME_WRONG_LENGTH');
                return;
            }
            if (rooms.find(room => room.name === newRoomName)) {
                socket.emit('CHAT/ROOM_NAME_ALREADY_USED');
                return;
            }
            const oldRoomName = Array.from(socket.rooms)[1];
            const oldRoom = rooms.find(room => room.name === oldRoomName);
            const user = oldRoom.users.find(user => user.socketId === socket.id);
            oldRoom.users = oldRoom.users.filter(user => user.socketId !== socket.id);
            socket.broadcast.to(oldRoomName).emit('ROOM/UPDATE_USERS', oldRoom.users.map(user => user.name));
            socket.leave(oldRoomName);
            socket.join(newRoomName);
            const newRoom = new Room(newRoomName, user.name);
            newRoom.users.push(user);
            rooms.push(newRoom);
            socket.emit('ROOM/JOIN_RESPONSE',
                {
                    currentRoom: {
                        ...newRoom,
                        users: newRoom.users.map(user => user.name)
                    },
                    rooms: rooms.map(room => room.name),
                    userName: user.name
                }
            );
            socket.broadcast.emit('ROOM/UPDATE_ROOMS', rooms.map(room => room.name));
        } catch (e) {
            socket.emit('CHAT/SOMETHING_WENT_WRONG');
        }
    });
    //при дисконнекте: отправляем обновленный список пользователей в текущей комнате
    socket.on('disconnecting', () => {
        console.log('Socket has been defused:', socket.id);
        try {
            if (socket.rooms.size > 1) {
                const roomName = Array.from(socket.rooms)[1];
                const room = rooms.find(room => room.name === roomName);
                room.users = room.users.filter(user => user.socketId !== socket.id);
                socket.broadcast.to(roomName).emit('ROOM/UPDATE_USERS', room.users.map(user => user.name));
                socket.leave(roomName);
            }
        } catch (e) {
            socket.emit('CHAT/SOMETHING_WENT_WRONG');
        }
    });
})

const PORT = config.get('port') || 5000;

if (process.env.NODE_ENV==='production') {
    app.use('/',express.static(path.join(__dirname,'client','build')));
    app.get('*', (request,response)=>{
        response.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}

server.listen(PORT, () => console.log(`App has been started on port ${PORT}`))