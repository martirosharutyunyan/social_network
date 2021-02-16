import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { action } from '../../redux/actions/action';
// import Media from '../../media';
import axios from 'axios';
import 'react-scroll';
//types
import { Redux } from '../../types/types';

let AboutPage:FC = () => {
    // @ts-ignore
    const io:SocketIOClient.Socket = useSelector((state:Redux) => state.Reducer.io);
    const [arr, setarr] = useState<any>([]);
    io.on('online users',(data:any)=>{
        setarr(data)
    })
    return (
        <>
            <section className=''>
                about Page
                {arr.map((elem:any,i:number):JSX.Element => {
                    return (
                        <div key={i}>
                            {elem.email}
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default AboutPage = memo(AboutPage); 