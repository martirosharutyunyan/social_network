import React, { useState, useEffect, useMemo, useRef, memo, FC } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import { action } from './components/redux/actions/action';
import {animateScroll as scroll} from 'react-scroll';
import {useSelector,useDispatch} from 'react-redux';
import 'react-scroll'
import './App.css';
import Navigation from './components/routs/navigation';
import Routs from './components/routs/routner';
import { Redux } from './components/types/types';
let App:FC = () => {
    return(
        <>
            <Navigation />
            <Routs/>
        </>
    )
}


export default App = memo(App);