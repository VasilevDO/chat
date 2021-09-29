import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { ChatPage } from './pages/chatPage';
import { AuthPage } from "./pages/authPage";

export const useRoutes = (userName) => {

    return (
        <Switch>
            <Route path='/chat/:id' exact>
                {userName ? <ChatPage /> : <AuthPage />}
            </Route>
            <Redirect to='/chat/main' />
        </Switch>
    )
}