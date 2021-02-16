import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { action } from '../../redux/actions/action';
// import Media from '../../media';
import axios from 'axios';
import 'react-scroll';
//types
import { input, Redux } from '../../types/types';

let Chat:FC = () => {
    const io:SocketIOClient.Socket = useSelector((state:Redux) => state.Reducer.io);
    const [state, setstate] = useState<any>({
        message:'',
        email:'',
    });
    const [messages, setmessages] = useState<any>([]);
    io.on('chat message',(data:any)=>{
        console.log(data)
        setmessages([...messages,data])
    })
    const changeValue = (e:input) => {
        setstate({...state,[e.target.placeholder]:e.target.value})
    }
    const click = () => {
        io.emit('chat message',state)
    }
    
    return (
        <>
            <section className=''>
                <input onChange={changeValue} value={state.message} placeholder='message' type="text"/>
                <input onChange={changeValue} value={state.email} placeholder='email' type="text"/>
                <button onClick={click}>click for send message</button>
                {messages.map((elem:any,i:number):JSX.Element => {
                    return (
                        <div key={i}>
                            {elem}
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default Chat = memo(Chat);