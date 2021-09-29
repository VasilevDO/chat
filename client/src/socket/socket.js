import io from 'socket.io-client';
import { currentRoomAddNewMessage, hideAlert, showAlert } from '../redux/chat/chatActions';
import { appRedirect, setUserName } from '../redux/app/appActions';
import { enterRoom, updateRooms, updateUsers } from '../redux/chat/chatActions';
import { store } from '../redux/store';

export const socket = io();

socket.on('ROOM/JOIN_RESPONSE', ({ currentRoom, rooms, userName }) => {
   store.dispatch(hideAlert('authPage'));
   store.dispatch(hideAlert('roomsBlock'));
   store.dispatch(appRedirect(currentRoom.name));
   store.dispatch(setUserName(userName));
   store.dispatch(enterRoom(currentRoom));
   store.dispatch(updateRooms(rooms));
});

socket.on('CHAT/NAME_ALREADY_USED', () => {
   store.dispatch(showAlert('authPage','This name is already taken'));
});

socket.on('CHAT/ROOM_NAME_ALREADY_USED', () => {
   store.dispatch(showAlert('roomsBlock','This room name is already taken'));
});

socket.on('CHAT/NAME_WRONG_LENGTH', () => {
   store.dispatch(showAlert('authPage','Name length should be from 1 to 16 characters'));
});

socket.on('CHAT/ROOM_NAME_WRONG_LENGTH', () => {
   store.dispatch(showAlert('roomsBlock','Room name length should be from 1 to 16 characters'));
});

socket.on('ROOM/SERVER_NEW_MESSAGE', (message) => {
   store.dispatch(currentRoomAddNewMessage(message));
});

socket.on('ROOM/UPDATE_ROOMS', rooms => {
   store.dispatch(updateRooms(rooms));
});

socket.on('ROOM/UPDATE_USERS', users => {
   store.dispatch(updateUsers(users));
});

socket.on('ROOM/EMPTY_MESSAGE',()=>{
   //do nothing=)
});

socket.on('CHAT/SOMETHING_WENT_WRONG',()=>{
   //do nothing=)
});

socket.on('CHAT/DISCONNECTED',()=>{
   store.dispatch(setUserName(null));
});