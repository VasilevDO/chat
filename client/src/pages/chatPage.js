import React from 'react';

import { Chat } from '../components/Chat';
import { ChatInput } from '../components/ChatInput';
import { RoomsBlock } from '../components/RoomsBlock';
import { UsersBlock } from '../components/UsersBlock';

export const ChatPage = () => {

    return (
        <div className='chatPage'>
            <div className='chat'>
                <RoomsBlock />
                <Chat />
                <UsersBlock />
            </div>
            <ChatInput />
        </div>
    )
}