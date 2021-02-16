import React, { useState, useEffect, useMemo, useRef, memo, FC, Component } from "react";
import { Route, Switch, NavLink, Link, Redirect } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { action } from "../redux/actions/action";
// import Media from '../../media';
import axios from "axios";
import "react-scroll";
//types
import { Redux } from "../types/types";

let PrivateRoute: FC<any> = ({component:Component,...rest}) => {
    const user = useSelector((state: Redux) => state.Reducer.url);
    return (
        <>
            <Route
                {...rest}
                render = {(props) =>{
                    return  user ? <Component {...props} /> : <Redirect to="/" />
                }
                }
            />
        </>
    );
};

export default PrivateRoute = memo(PrivateRoute);
