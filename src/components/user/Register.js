import React from 'react'
import API from "../../services/api";
import {Button, Form, Input, notification} from "antd";
import {Link, useHistory} from "react-router-dom";

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

export const Register = () => {
    const history = useHistory();

    const onFinish = (values) => {
        API.post('/users', {email: values.email, password: values.password})
            .then(response => {
                console.log('success')
                console.log('id:', response.id)
                notification['success']({
                    message: 'Login has been registered.'
                })
                history.push('/user')
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Register error!',
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
                    Register
                </Button>
                <p> <br/> Already have an account? <Link to="/login">Sign in</Link>!</p>

            </Form.Item>
        </Form>
    );
}