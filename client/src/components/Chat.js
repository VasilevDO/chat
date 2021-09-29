import React from 'react';
import { useSelector } from 'react-redux';

import { Message } from './Message';

export const Chat = () => {
    const userName=useSelector(state=>state.app.userName);
    const state = useSelector(state => state.chat);
    const { currentRoom } = state;

    return (
        <div className='chatBlock'>
            {currentRoom?.messages?.concat().reverse().map(msg => (
                <div className={'message'+(msg.by===userName?' message-right':' message-left')} key={msg.date + msg.by}>
                    <Message props={msg} />
                </div>
            ))}
        </div>
    )
}