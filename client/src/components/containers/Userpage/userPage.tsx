import React, { useState, useEffect, useMemo, useRef, memo, FC } from "react";
import { Route, Switch, NavLink, Link, useHistory } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../redux/actions/action";
// import Media from '../../media';
import axios, { AxiosResponse } from "axios";
import "react-scroll";
//types
import { input, Redux } from "../../types/types";
import { UserToken } from "../token/UserToken";
import { changingPassword } from "./types";
import { Graphql } from "../../graphql/GraphqlQueries";
import Loader from "../loader/loader";

let UserPage: FC = () => {
    const dispatch = useDispatch();
    const hystory = useHistory();
    const [state, setState] = useState<changingPassword>({
        oldPassword: "hhs13516",
        confirmNewPassword: "13516hhs",
        newPassword: "13516hhs",
        verificationCode: "",
    });
    const [bool, setbool] = useState<boolean>(false);
    const [load, setload] = useState<boolean>(false);
    const [code, setcode] = useState<string>("");
    const data = useSelector((state: Redux) => state.Reducer.data);
    const changeValue = (e: input): void => {
        setState({ ...state, [e.target.id]: e.target.value });
    };
    const logoutFromUser = async (): Promise<void> => {
        UserToken.logout();
        dispatch({ type: "URL", payload: "" });
        hystory.push("/");
    };
    const deleteUser = async (): Promise<void> => {
        await Graphql.DeleteUser(data.email)
        UserToken.logout();
        dispatch({ type: "URL", payload: "" });
        hystory.push("/");
    };
    const changingPassword = async (): Promise<void> => {
        setload(true)
        const Response:any = await Graphql.ChangePassword(state.oldPassword,data.email)
        setload(false)
        setcode(Response);
        setbool(true);
    };
    const verificate = async (): Promise<void> => {
        setload(true)
        const Response = await Graphql.ChangePasswordSave(state.newPassword,code,state.verificationCode,data.email)
        if(Response === 'Password changed'){
            setbool(false)
            setload(true)
            return 
        }
        setload(false)
        console.log(Response);
    };
    if (load) {
        return <Loader/>
    }
    return (
        <>
            <section className="">
                hello {data.name}
                <div style={{ margin: "1vw" }}>
                    <button onClick={logoutFromUser}>logout</button> <br />
                    <button onClick={deleteUser}>delete</button>
                    <br />
                </div>
                <div style={{marginTop:'1vw'}}>
                    <h1>Changing password</h1>
                    {bool ? (
                        <>
                            <input
                                id="newPassword"
                                value={state.newPassword}
                                onChange={changeValue}
                                placeholder="new password"
                                type="text"
                            />
                            <input
                                id="confirmNewPassword"
                                value={state.confirmNewPassword}
                                onChange={changeValue}
                                placeholder="confirm new password"
                                type="text"
                            />
                            <input
                                id="verificationCode"
                                placeholder="verification code"
                                value={state.verificationCode}
                                onChange={changeValue}
                            />
                            <button onClick={verificate}>
                                change password
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                id="oldPassword"
                                value={state.oldPassword}
                                onChange={changeValue}
                                placeholder="old password"
                                type="text"
                            />
                            <button onClick={changingPassword}>
                                click for check the old password
                            </button>
                        </>
                    )}
                </div>
                <button onClick={()=>setbool(false)}>clear</button>
            </section>
        </>
    );
};

export default UserPage = memo(UserPage);
