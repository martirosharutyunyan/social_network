import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, Switch, NavLink, Link, useHistory } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { action } from '../../redux/actions/action';
// import Media from '../../media';
import axios, { AxiosResponse } from 'axios';
import 'react-scroll';
//types
import { Redux } from '../../types/types';
import { UserToken } from '../token/UserToken';

let HomePage:FC = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {

    }, []);

    const [state, setState] = useState('');

    const arr = useSelector((state:Redux) => state.Reducer.arr);
    
    return (
        <>
            <section className=''>
                home
            </section>
        </>
    )
}

export default HomePage = memo(HomePage);