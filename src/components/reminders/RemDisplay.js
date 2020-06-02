import React, {useEffect, useState} from 'react'
import {Button, Card, Form, Input, notification, Popover} from "antd";
import { FileSearchOutlined, EditOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import API from "../../services/api";

export const RemDisplay = (props) => {
    const [rem, setRem] = useState('')
    const [pres, setPres] = useState('')

    function moreInfo() {
        return(
            <>
                <b>Date:</b> {pres.date}<br/>
                <b>Keywords:</b> {pres.keywords}<br/>
                <b>Authors:</b> {pres.authors}<br/>
                <b>Session:</b> {pres.session}<br/>
            </>
        )
    }

    function download() {
        API.get(`/abstracts/${pres.filename}`,{responseType: 'arraybuffer'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',`${pres.filename.split('/')[1]}`);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Error!',
                    description: 'File has not been found!'
                })
            });
    }

    function remNoteEdit() {
            return <>
                <Form name="basic" onFinish={remPut} style={{width: 300}}>
                    <Form.Item label="Note" name="note">
                        <Input placeholder="..."/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
    }

    function remPut(attr) {
        API.put(`/reminders/${rem.id}`,{ "presentationId": `${pres.id}`, "notes": attr.note,
            "enabled": true }, {headers:{Authorization:`Bearer ${props.token}`}})
            .then(response=>{
                notification.open({
                    message: 'Saved',
                    description: 'Note edited!',
                    duration: 3,
                });
                setRem({"id": rem.id, "presentationId": rem.presentationId, "notes": attr.note, "enabled": true})
            })
            .catch(err=>{
                notification['error']({
                    message: 'Error!',
                    description: 'Edit error!'
                })
            })
    }

    function remDelete() {
        API.delete(`/reminders/${rem.id}`, {headers:{Authorization:`Bearer ${props.token}`}})
            .then(response=>{
                notification.open({
                    message: 'Deleted',
                    description: 'Reminder deleted!',
                    duration: 3,
                });
                window.location.reload();
            })
            .catch(err=>{
                notification['error']({
                    message: 'Error!',
                    description: 'Delete error!'
                })
            })
    }

    useEffect( () => {
        API.get(`/reminders/${props.remId}`, {headers:{Authorization:`Bearer ${props.token}`}})
            .then(response => {
                console.log('Reminder claimed.');
                setRem(response.data);
            })
            .catch(errInfo => {
                console.log('Reminder error: ', errInfo)
            });

        API.get(`/presentations/${props.presId}`, {headers:{Authorization:`Bearer ${props.token}`}})
            .then(response => {
                console.log('Presentation claimed.');
                setPres(response.data);
            })
            .catch(errInfo => {
                console.log('Presentation error: ', errInfo)
            });
        }, //eslint-disable-next-line
        []);

    return (
        <Card title={pres.title} actions={[
            <Popover title={pres.title} content={moreInfo(pres)} trigger="click">
                <FileSearchOutlined key="moreInfo" />
            </Popover>,
            <Popover title="Edit Note" content={remNoteEdit()} trigger="click">
                <EditOutlined key="edit" />
            </Popover>,
            <DownloadOutlined key="download" onClick={()=>download()} />,
            <DeleteOutlined key="delete" onClick={()=>remDelete()} />
        ]}>
            <h3>
                <b>Starts at:</b> {pres.date}<br/>
                <b>Notes:</b> {rem.notes}<br/>
            </h3>
        </Card>
    )
};