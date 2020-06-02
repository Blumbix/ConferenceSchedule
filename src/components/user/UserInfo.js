import React, {useEffect, useState} from 'react'
import API from '../../services/api'
import Cookies from 'js-cookie'

export const UserInfo = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [logged, setLogged] = useState(false);

    useEffect( () => {
        const token=Cookies.get('token');

        if(token != null) {
            setLogged(true);
            API.get('/users/me', {headers:{Authorization:`Bearer ${token}`}})
                .then(response => {
                    console.log('Data claimed.');
                    setId(response.data.id)
                    setEmail(response.data.email);
                    setCreatedAt(response.data.createdAt);
                })
                .catch(errInfo => {
                    console.log('Data error: ', errInfo)
                });
        }
    }, //eslint-disable-next-line
    []);

    if(logged)
        return (
            <>
                User id: <b>{id}</b><br/>
                User email: <b>{email}</b><br/>
                User created at: <b>{createdAt}</b>
            </>
        );
    else
        return (
            <>The user is not logged.</>
        );
};