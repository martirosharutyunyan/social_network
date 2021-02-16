import React, { useState, useEffect, useMemo, useRef, memo, FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { input, Redux } from "../../types/types";
import { Graphql } from '../../graphql/GraphqlQueries';
import { UserToken } from "../token/UserToken";
import Loader from "../loader/loader";
import socket from 'socket.io-client';

let Login: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    type LoginState = {
        loginEmail:string
        loginPassword:string
    }
    const [state, setState] = useState<LoginState>({
        loginEmail:'harutunyan.martiros@mail.ru',
        loginPassword:'hhs13516',
    });
    const [load, setload] = useState<boolean>(false);
    const changeValue = (e:input):void => {
        setState({...state,[e.target.id]:e.target.value})
    }
    const login =async ():Promise<void> => {
        setload(true)
        const data:any = await Graphql.LoginQuery(state.loginEmail,state.loginPassword)
        if(data === 'User not finded' || data === 'Password is false'){
            console.log(data)
            setload(false)
            return 
        }
        const User:any = await Graphql.TokenVerify(data)
        UserToken.LoginToken(data);
        dispatch({type:"URL", payload:User.name});
        dispatch({type:'DATA',payload:User});
        dispatch({type:'SOCKET',payload:socket('ws://localhost:8888',{query:{auth:User.email}})})
        history.push(`/${User.name}`);
    }
    if (load) {
        return <Loader/>
    }
    return (
        <>
            <section className="">
                <NavLink to="/">Registration</NavLink>
                <div className="login">
                    <div style={{ fontSize: "2vw" }}>Login</div>
                    <input
                        value={state.loginEmail}
                        onChange={changeValue}
                        placeholder="email"
                        id="loginEmail"
                        type="text"
                    />
                    <input
                        value={state.loginPassword}
                        onChange={changeValue}
                        placeholder="password"
                        id="loginPassword"
                        type="password"
                    />
                    <button onClick={login}>click</button>
                </div>
            </section>
        </>
    );
};

export default Login = memo(Login);
