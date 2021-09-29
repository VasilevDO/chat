import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
export const redirect = (location) => {
    history.push(location);
}