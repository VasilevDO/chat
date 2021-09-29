import {combineReducers} from 'redux';

import {chatReducer} from './chat/chatReducer';
import {appReducer} from './app/appReducer';

export const reducer=combineReducers({
    chat:chatReducer,
    app:appReducer
})