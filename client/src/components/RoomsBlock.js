import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { changeRoom, createNewRoom } from '../socket/socketActions';

export const RoomsBlock = () => {

    const state = useSelector(state => state.chat);
    const [newRoomInput,setNewRoomInput]=useState('');
    const { rooms } = state;

    const handleRoomChange = (e) => {
        changeRoom(e.target.innerText);
    }

    const handleNewRoom=(e)=>{
        e.preventDefault();
        createNewRoom(newRoomInput);
        setNewRoomInput('');
    }

    const handlenewRoomInputChange = (e) => {
        setNewRoomInput(e.target.value);
    }
    
    return (
        <div className='roomsBlock'>
            <div className='pwnz-f-grow1'>
                <p className='pwnz-t-c pwnz-fs20 pwnz-bb'>Available rooms:</p>
                {rooms.map((room) => (
                    <p tabIndex='0' className='pwnz-c-p pwnz-mt10' key={room} onClick={handleRoomChange}>{room}</p>
                ))}
                </div>
                {state.alert.roomsBlock?
                (
                    <p className='pwnz-t-c'>{state.alert.roomsBlock}</p>
                )
                :null}
                <form onSubmit={handleNewRoom} className='pwnz-f-dc-c'>

                <input className='pwnz-mt10 pwnz-w100' value={newRoomInput} onChange={handlenewRoomInputChange} placeholder='New room name'/>
                <button className='pwnz-p5 pwnz-mt10 pwnz-w100' onClick={handleNewRoom}>Create new room</button>
                </form>
            </div>
        )
    }