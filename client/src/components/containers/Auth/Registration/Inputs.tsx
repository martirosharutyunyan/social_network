import React, { useState, useEffect, useMemo, useRef, memo, FC } from "react";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../redux/actions/action";
// import Media from '../../media';
import axios from "axios";
import "react-scroll";
//types
import { input, Redux, stateType } from "../../../types/types";
import VerificationArea from "./VerificationArea";
import { Graphql } from "../../../graphql/GraphqlQueries";
import request from "graphql-request";
import Loader from "../../loader/loader";

let Inputs:FC = () => {
    const dispatch = useDispatch();
    const dis = (type:string,payload:any) =>{
        dispatch({type,payload})
    }
    const [state, setstate] = useState<stateType>({
        name: "Martiros",
        surname: "Harutunyan",
        email: "harutunyan.martiros@mail.ru",
        password: "hhs13516",
        confirmPassword: "hhs13516",
        verificationCode: "",
    });
    const verify = useSelector((state:Redux) => state.Reducer.verify);
    const [code, setcode] = useState<string>('');
    const [load, setload] = useState<boolean>(false);
    const [timer, settimer] = useState<any>('');
    const changeValue = useMemo(() => {
        return (e:input)=> {
            setstate({...state,[e.target.id]:e.target.value})
        }
    }, [state]);
    const clear = ():void => {
        setstate({
            confirmPassword:'',
            email:'',
            name:'',
            password:'',
            surname:'',
            verificationCode:''
        })
        dispatch({type:"VERIFY",payload:true})
    }
    const timerStart = (): void => {
        settimer(60);
        let x:number = 60;
        let interval = setInterval(() => {
            if(x === 0){
                setcode('')
                setstate({...state,verificationCode:''})
                dispatch({type:"VERIFY",payload:true})
                clearInterval(interval)
            }
            settimer(x-1);
            x--
        }, 1000);
    };
    const Registration =async ():Promise<void> => {
        setload(true)
        const data = await Graphql.checkUser(state.email,state.name,state.surname,state.password)
        if(data === 'the inputs are not filled' || data === 'this email already in use'){
            console.log(data)
            return  setload(true)
        }
        setcode(data)
        setload(false)
        dispatch({type:"VERIFY",payload:false})
        timerStart()
    }
    if (load) {
        return <Loader/>
    }
    return (
        <>
            <section className="">
                <div className="registracia">
                    <div style={{ fontSize: "2vw" }}>Registracia</div>
                    <input
                        onChange={changeValue}
                        value={state.name}
                        placeholder="name"
                        type="text"
                        id="name"
                    />
                    <input
                        onChange={changeValue}
                        value={state.surname}
                        placeholder="surname"
                        type="text"
                        id="surname"
                    />
                    <input
                        onChange={changeValue}
                        value={state.email}
                        placeholder="email"
                        type="text"
                        id="email"
                    />
                    <input
                        onChange={changeValue}
                        value={state.password}
                        placeholder="password"
                        type="password"
                        id="password"
                    />
                    <input
                        onChange={changeValue}
                        value={state.confirmPassword}
                        placeholder="confirm Password"
                        type="password"
                        id="confirmPassword"
                    />
                    <button
                        onClick={Registration}
                        disabled={
                            state.name.trim() &&
                            state.surname.trim() &&
                            state.email.trim() &&
                            state.password.trim() &&
                            state.confirmPassword.trim() &&
                            state.confirmPassword === state.password &&
                            state.password.length >= 8 &&
                            state.confirmPassword.length >= 8
                                ? false
                                : true
                        }
                    >
                        click
                    </button>
                    {verify ? null : <VerificationArea timer={timer} code={code} state={state} changeValue={changeValue}/> }
                    <button onClick={clear}>clear</button>
                </div>
            </section>
        </>
    );
};

export default Inputs = memo(Inputs);
