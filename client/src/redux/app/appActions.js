import { APP_REDIRECT, APP_SET_USER_NAME } from "../types";

export function setUserName (userName) {
    return dispatch=> {
        dispatch({
            type:APP_SET_USER_NAME,
            payload:userName
        });
    }
}

export function appRedirect (location) {
    return dispatch=> {
        dispatch({
            type:APP_REDIRECT,
            payload:location
        })
    }
}