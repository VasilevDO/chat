import React, { useRef } from 'react';
import { useParams } from 'react-router';

import { useSelector } from 'react-redux';

import { enterChat } from '../socket/socketActions';

export const AuthPage = () => {
    const state = useSelector(state => state.chat);
    const params = useParams();
    const userNameInputRef = useRef();

    const handleAuth = (e) => {
        e.preventDefault();
        enterChat(userNameInputRef.current.value, params.id);
    }

    return (
        <div className='authPage pwnz-f-c pwnz-w100'>
            <div className='pwnz-f-dc-c'>
                {state.alert?.authPage ?
                    (
                        <span>{state.alert.authPage}</span>
                    )
                    :
                    null}
                <form className='loginForm' onSubmit={handleAuth}>
                    <input className='pwnz-w100' ref={userNameInputRef} placeholder='Enter your name' />
                    <button className='pwnz-w100' onClick={handleAuth}>Enter chat</button>
                </form>
            </div>
        </div>
    )
}