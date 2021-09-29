import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { appRedirect } from '../middleware/redirect';
import { reducer } from './reducer';

export const store=createStore(reducer, compose(
    applyMiddleware(
        thunk,
        appRedirect
    )
));