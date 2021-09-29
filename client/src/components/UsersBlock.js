import React from 'react';
import { useSelector } from 'react-redux';

export const UsersBlock = () => {

    const state=useSelector(state=>state.chat?.currentRoom);

    const users=state?.users||[];

    return (
        <div className='usersBlock'>
            <p className='pwnz-t-c pwnz-fs20 pwnz-bb'>Users in this room:</p>
            {users.map(user=>(
                <p className='pwnz-mt10' key={user}>{user}</p>
            ))}
        </div>
    )
}