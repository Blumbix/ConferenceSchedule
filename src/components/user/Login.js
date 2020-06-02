import React from 'react';
import {Link, useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import '../../index.css'
import { Form, Input, Button, notification} from 'antd';
import API from '../../services/api'
import Cookies from 'js-cookie'

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 6,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 6,
    },
};

export const Login = () => {
    const history = useHistory();

    const onFinish = (values) => {
        const credentials=btoa(`${values.email}:${values.password}`);
        API.post('/auth', {}, {headers:{Authorization:`Basic ${credentials}`}})
            .then(response => {
                console.log('Login successful.');
                Cookies.set('token', response.data.token, {expires: 1});
                history.push('/userinfo')
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Login error!',
                    description: 'Wrong input data.'
                })
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input placeholder="abc@xyz.com"/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password type='password' placeholder='Password' />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                <p> <br/> Don't have an account? <Link to="/register">Register now</Link>!</p>

            </Form.Item>
        </Form>
    )
}