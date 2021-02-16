import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, Switch, NavLink, Link, useHistory } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { action } from '../../../redux/actions/action';
// import Media from '../../media';
import axios from 'axios';
import 'react-scroll';
//types
import { Redux, stateType, userDataType } from '../../../types/types';
import { Graphql } from '../../../graphql/GraphqlQueries';
import Inputs from './Inputs';
import { UserToken } from '../../token/UserToken';
import Loader from '../../loader/loader';
import socket from 'socket.io-client';

let Registration:FC = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [load, setload] = useState<boolean>(false);
    const setUsers =async ():Promise<any> =>{
        const arr = await Graphql.getUsers()
        setarr(arr)        
    }
    const AutoLogin =async ():Promise<void> => {
        if (UserToken.isLogin()) {
            setload(true)
            const data:any = await Graphql.TokenVerify(UserToken.isLogin())
            if(data === 'please login again'){
                console.log(data)
                setload(false)
                return 
            }
            setload(false)
            dispatch({type:'URL',payload:data.name});
            dispatch({type:'DATA',payload:data});
            dispatch({type:'SOCKET',payload:socket('ws://localhost:8888',{query:{auth:data.email}})})
            history.push(`/${data.name}`)
        }
    }
    useEffect(():void => {
        // AutoLogin()
    }, []);
    useEffect(() => {
        setUsers()
    }, [load]);
    const [arr, setarr] = useState<userDataType[]>([]);
    const UserDelete =async (email:any):Promise<void> => {
        setload(true)
        let x = await Graphql.DeleteUser(email)
        console.log(x)
        setload(false)
    }
    if (load) {
        return <Loader/>
    }
    return (
        <>
            <section className='div'> 
            <NavLink to='/login'>go to login</NavLink>
            <Inputs/>
            {arr.map(
                    (elem: userDataType, i: number): JSX.Element => {
                        return (
                            <div key={elem.id}>
                                <p>{elem.email}</p>
                                <p>{elem.password}</p>
                                <button onClick={UserDelete.bind(null,elem.email)}>delete</button>
                            </div>
                        );
                    },
            )}
            </section>
        </>
    )
}

export default Registration = memo(Registration);