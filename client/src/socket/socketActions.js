import {socket} from './socket';

export function enterChat (userName,roomName) {
    socket.emit('ROOM/JOIN_REQUEST', {
        userName,
        roomName
    });
}

export function leaveRoom (roomName) {
    socket.emit('ROOM/LEAVE_REQUEST', roomName);
}

export function createNewRoom(roomName) {
    socket.emit('CHAT/CREATE_NEW_ROOM',roomName);
}

export function sendMessage (message) {
    socket.emit('ROOM/CLIENT_NEW_MESSAGE', message);
}

export function changeRoom (newRoomName) {
    socket.emit('CHAT/CHANGE_ROOM',newRoomName);
}