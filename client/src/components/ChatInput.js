import React, { useState } from 'react';
import { sendMessage } from '../socket/socketActions';

export const ChatInput = () => {

    const [input, setInput] = useState('');


    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    }

    return (
            <form onSubmit={handleMessageSubmit} className='chatInput'>
                <input className='pwnz-w100' value={input} onChange={handleInputChange} placeholder='Enter your message' />
                <button onClick={handleMessageSubmit}>Send</button>
            </form>
    )
}