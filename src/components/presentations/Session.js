import React, {useEffect, useState} from 'react'
import API from "../../services/api";

export const Session = () => {
    const [sessions, setSessions] = useState('');

    useEffect( () => {
            API.get('/sessions', {})
                .then(response => {
                    console.log('Sessions claimed.');
                    setSessions(response.data);
                })
                .catch(errInfo => {
                    console.log('Sessions error: ', errInfo)
                });
        }, //eslint-disable-next-line
        []);

    return (
            <>
                <b>PLENARY</b> {JSON.stringify(sessions['PLENARY'])}<br/>
                <b>COMMERCIAL_PLENARY</b> {JSON.stringify(sessions['COMMERCIAL_PLENARY'])}<br/>
                <b>FSIP</b> {JSON.stringify(sessions['FSIP'])}<br/>
                <b>STM</b> {JSON.stringify(sessions['STM'])}<br/>
                <b>CMD</b> {JSON.stringify(sessions['CMD'])}<br/>
                <b>SWP</b> {JSON.stringify(sessions['SWP'])}<br/>
                <b>NTSM</b> {JSON.stringify(sessions['NTSM'])}<br/>
                <b>PHD</b> {JSON.stringify(sessions['PHD'])}<br/>
                <b>CSM</b> {JSON.stringify(sessions['CSM'])}<br/>
                <b>POSTER</b> {JSON.stringify(sessions['POSTER'])}<br/>
                <b>CTS</b> {JSON.stringify(sessions['CTS'])}<br/>
                <b>ANM</b> {JSON.stringify(sessions['ANM'])}<br/>
                <b>BIO</b> {JSON.stringify(sessions['BIO'])}<br/>
                <b>MICRO</b> {JSON.stringify(sessions['MICRO'])}<br/>
                <b>CFD</b> {JSON.stringify(sessions['CFD'])}<br/>
                <b>OPT</b> {JSON.stringify(sessions['OPT'])}<br/>
            </>
    )
};




