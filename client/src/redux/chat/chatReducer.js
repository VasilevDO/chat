import {CHAT_ADD_NEW_MESSAGE, CHAT_HIDE_ALERT, CHAT_INIT_ROOM, CHAT_SHOW_ALERT, CHAT_UPDATE_ROOMS, CHAT_UPDATE_USERS } from "../types"


const initialState={
    currentRoom:null,
    rooms:[],
    alert:{}
}

export const chatReducer=(state=initialState,action) => {
    const {currentRoom}=state;
    const alert={
        ...state.alert,
       
    };
    switch(action.type) {
        case CHAT_INIT_ROOM:
            return {...state,currentRoom:action.payload};
        case CHAT_ADD_NEW_MESSAGE:
            currentRoom.messages=currentRoom.messages.concat(action.payload);
            return {...state,currentRoom:currentRoom};
        case CHAT_UPDATE_ROOMS:
            return {...state, rooms:action.payload}
        case CHAT_SHOW_ALERT:
            alert[action.payload.component]=action.payload.message
            return {...state, alert}
        case CHAT_HIDE_ALERT:
            delete alert[action.payload];
        return {...state,alert}
        case CHAT_UPDATE_USERS:
            currentRoom.users=action.payload;
            return {...state, currentRoom:currentRoom}
        default: return state
    }
}