import React, {useEffect} from 'react'
import API from "../../services/api";
import Cookies from "js-cookie";

export const RemPost = (props) => {
    const token=Cookies.get('token')

    useEffect( () => {
        if(token != null) {
            API.post(`/reminders`, {
                    "presenationId": props.presId,
                    "notes": '',
                    "enabled": true
                },
                {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    console.log('Reminder posted.');
                })
                .catch(errInfo => {
                    console.log('Reminder post error: ', errInfo)
                });
            }
        }, //eslint-disable-next-line
        []);

    return (
        <></>
    )
};