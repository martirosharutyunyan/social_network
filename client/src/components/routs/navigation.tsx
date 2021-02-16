import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import { action } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
//types
import { Redux } from "../types/types";
function Navigation() {
    const dispatch = useDispatch();
    const redux = useSelector((state: Redux) => state.Reducer.arr);
    const url = useSelector((state: Redux) => state.Reducer.url);
    return (
        <>
            <nav>
                <ul className="ul">
                    {url ? (
                        <>
                            <li>
                                <NavLink exact to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${url}`}>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to='chat'>Chat</NavLink>
                            </li>
                        </>
                    ) : null}
                </ul>
            </nav>
        </>
    );
}
export default Navigation;
