import { APP_SET_USER_NAME } from "../types"


const initialState={
    processing:[],
    userName:null
}

export const appReducer=(state=initialState,action) => {
    switch(action.type) {
        case APP_SET_USER_NAME:
            return {...state,userName:action.payload}
        default: return state
    }
}