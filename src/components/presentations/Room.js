import React, {useEffect, useState} from 'react'
import API from "../../services/api";

export const Room = () => {
    const [rooms, setRooms] = useState('');

    useEffect( () => {
            API.get('/rooms', {})
                .then(response => {
                    console.log('Rooms claimed.');
                    setRooms(response.data);
                })
                .catch(errInfo => {
                    console.log('Rooms error: ', errInfo)
                });
        }, //eslint-disable-next-line
        []);

    return (
        <>
                <b>A</b> {JSON.stringify(rooms['A'])}<br/>
                <b>B</b> {JSON.stringify(rooms['B'])}<br/>
                <b>AB</b> {JSON.stringify(rooms['AB'])}<br/>
                <b>P</b> {JSON.stringify(rooms['P'])}<br/>
                <b>C</b> {JSON.stringify(rooms['C'])}<br/>
        </>
    )
};



