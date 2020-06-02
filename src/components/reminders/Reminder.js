import React, {useEffect, useState} from 'react'
import Cookies from "js-cookie";
import API from "../../services/api";
import {Col, Row} from "antd";
import {RemDisplay} from "./RemDisplay";

export const Reminder = () => {
    const [logged, setLogged] = useState(false);
    const [reminders, setReminders] = useState([]);
    const token=Cookies.get('token')

    useEffect( () => {
        if(token != null) {
            setLogged(true);
            API.get('/reminders', {headers:{Authorization:`Bearer ${token}`}})
                .then(response => {
                    console.log('Reminders claimed.');
                    setReminders(response.data);
                })
                .catch(errInfo => {
                    console.log('Reminders error: ', errInfo)
                });
        }
        }, //eslint-disable-next-line
        []);

    if(logged)
        return (
            <div className="site-card-border-less-wrapper">
                <Row>
                    {reminders.map(rem =>
                        <Col span={6} key={rem.id}>
                            <div className="card-content">
                                <RemDisplay presId={rem.presentationId} remId={rem.id} token={token}/>
                            </div>
                        </Col>

                    )}
                </Row>
            </div>
        );
    else
        return (
            <>The user is not logged.</>
        );
};