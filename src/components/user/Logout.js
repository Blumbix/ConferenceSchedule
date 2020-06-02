import React, {useEffect} from 'react'
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";

export const Logout = () => {
    const history = useHistory();

    useEffect(()=>{
            if(Cookies.get('token') != null) {
                Cookies.remove('token');
            }
            history.push("./");
        }, //eslint-disable-next-line
        []);

    return (
        <></>
    );
};