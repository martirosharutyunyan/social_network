import React, { useState, useEffect, useMemo, useRef, memo, FC, Fragment, lazy, Suspense } from "react";
import { Route, Switch, NavLink, Link, Redirect, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-scroll";
import { Redux } from "../types/types";
import './navigation.scss'
const Login = lazy(()=> import("../containers/Auth/Login"))
const Registration = lazy(()=> import("../containers/Auth/Registration/Registration"))
const AboutPage = lazy(()=> import("../containers/AboutPage/AboutPage"))
const ContactPage = lazy(()=> import("../containers/ContactPage/ContactPage"))
const User = lazy(()=> import('../containers/Userpage/userPage'))
const HomePage = lazy(()=> import("../containers/HomePage/homePage"))
const Chat = lazy(()=> import('../containers/Chat/Chat'))
let Routes: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {}, []);
    const url = useSelector((state:Redux) => state.Reducer.url);
    return (
        <Suspense fallback={<div>...loading</div>}>
            <>
            {
                url ?   <Switch>
                            <Route exact path='/' component={HomePage}/>
                            <Route path='/about' component={AboutPage}/>
                            <Route path='/contact' component={ContactPage}/>
                            <Route path={`/${url}`} component={User}/>
                            <Route path='/chat' component={Chat}/>
                            <Redirect to='/'/>
                        </Switch> 
                :       <Switch>
                            <Route exact path="/" component={Registration}/>
                            <Route path='/login' component={Login}/>
                            <Redirect to='/'/>
                        </Switch>
            }
            </>
        </Suspense>
    )
    
};

export default Routes = memo(Routes);
