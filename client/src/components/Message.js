import React from 'react';
import { dateToString } from '../pwnz/pwnz';

export const Message = (props) => {
    console.log(props);
    const {message,by,date}=props.props;

    return (
        <>
            <span className='pwnz-bb'>{message}</span>
            <span className='pwnz-t-r'>{dateToString(new Date(date)) +' by '+ by}</span>
        </>
    )
}