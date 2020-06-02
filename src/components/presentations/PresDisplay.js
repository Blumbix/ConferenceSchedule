import React from 'react'
import {Card, Popover, notification, Form, Input, Button} from "antd";
import { FileSearchOutlined, BellOutlined, DownloadOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";
import API from "../../services/api";

export const PresDisplay = (props) => {
    const token=Cookies.get('token');

    function moreInfo() {
        return(
            <>
                <b>Starts at:</b> {props.date.substr(11, 5)}<br/>
                <b>Date:</b> {props.date.substr(0, 10)}<br/>
                <b>Keywords:</b> {props.keywords.join(', ')}<br/>
                <b>Authors:</b> {props.authors.join(', ')}<br/>
                <b>Session:</b> {props.session}<br/>
            </>
        )
    }

    function remPost(attr) {
        console.log(props.id)
        API.post(`/reminders`,
            {   "presentationId": props.id,
                "notes": attr.note,
                "enabled": true},
            {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                console.log('Reminder posted.');
                notification.open({
                    message: 'Saved!',
                    description: 'Reminder has been added to your list.',
                    duration: 3,
                })
            })
            .catch(errInfo => {
                console.log('Reminder post error: ', errInfo)
            });
    }

    function remNoteEnter() {
        if(token != null) {
            return <>
                <Form name="basic" onFinish={remPost} style={{width: 300}}>
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
        else {
            return <>
                The user is not logged.
            </>
        }
    }

    function download() {
        API.get(`/abstracts/${props.filename}`,{responseType: 'arraybuffer'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',`${props.filename.split('/')[1]}`);
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

    return (
                    <Card title={props.title} actions={[
                        <Popover title={props.title} content={moreInfo()} trigger="click">
                            <FileSearchOutlined key="moreInfo" />
                        </Popover>,
                        <Popover title="Add reminder" content={remNoteEnter()} trigger="click">
                            <BellOutlined key="remind" />
                        </Popover>,
                        <DownloadOutlined key="download" onClick={()=>download()} />,
                    ]}>
                        <h3><b>Starts at:</b> {props.date.substr(11, 5)}</h3>
                    </Card>

    )
};