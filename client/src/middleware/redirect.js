import { redirect } from '../history';

import { APP_REDIRECT } from '../redux/types';

export function appRedirect({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === APP_REDIRECT) {
                console.log(action.payload);
                redirect(action.payload);
            }
            return next(action);
        }  
    }
}