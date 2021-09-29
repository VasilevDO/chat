import {CHAT_ADD_NEW_MESSAGE, CHAT_HIDE_ALERT, CHAT_INIT_ROOM, CHAT_SHOW_ALERT, CHAT_UPDATE_ROOMS,CHAT_UPDATE_USERS } from "../types";

export function enterRoom (room) {
    return dispatch=>{
        dispatch({
            type:CHAT_INIT_ROOM,
            payload:room
        });
    }
}

export function updateRooms (rooms) {
    return dispatch=> {
        dispatch({
            type:CHAT_UPDATE_ROOMS,
            payload:rooms
        })
    }
}

export function updateUsers (users) {
    return dispatch=> {
        dispatch({
            type:CHAT_UPDATE_USERS,
            payload:users
        })
    }
}

export function currentRoomAddNewMessage (message) {
    return dispatch => {
        dispatch ({
            type:CHAT_ADD_NEW_MESSAGE,
            payload:message
        })
    }
}

export function showAlert (component,message) {
    return dispatch => {
        dispatch({
            type:CHAT_SHOW_ALERT,
            payload:{
                component,message
            }
        })
    }
}

export function hideAlert (component,message) {
    return dispatch => {
        dispatch({
            type:CHAT_HIDE_ALERT,
            payload:component
        })
    }
}


