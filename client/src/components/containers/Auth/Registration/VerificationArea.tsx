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
import { Graphql } from "../../../graphql/GraphqlQueries";
import Loader from "../../loader/loader";
type props = {
    state: stateType;
    changeValue: (e: input) => void;
    code: string;
    timer: string;
};
let VerificationArea: FC<props> = ({ changeValue, state, code, timer }) => {
    const dispatch = useDispatch()
    const [load, setload] = useState<boolean>(false);
    const SaveUser = async (): Promise<void> => {
        setload(true);
        let x = await Graphql.AddUser(state, code);
        console.log(x);
        if (x === "code is false") {
            setload(true);
            return;
        }
        setload(false);
        dispatch({type:'VERIFY',payload:true})
    };
    if (load) {
        return <Loader/>
    }
    return (
        <>
            <section className="">
                <input
                    type="text"
                    onChange={changeValue}
                    value={state.verificationCode}
                    id="verificationCode"
                />
                <button onClick={SaveUser}>click for verification</button>
                {timer ? `timer: ${timer}` : null}
            </section>
        </>
    );
};

export default VerificationArea = memo(VerificationArea);
