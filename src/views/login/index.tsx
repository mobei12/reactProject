// noinspection JSIgnoredPromiseFromCall

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './index.scss';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from '../../utils/http';

const { Title } = Typography;
export default class Login extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    onFinish = (values: { username: string, password: string }) => {
        Axios('/api/user/login', {
            method: 'POST',
            responseType: 'json',
            data: {
                ...values
            }
        }).then((response) => {
            const { code, message: msg } = response.data;
            if (code === 200) {
                if (response.data.token) {
                    message.success(msg);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                    this.props.history.push('/home');
                } else {
                    message.warning(msg);
                }
            } else {
                message.error('报错了');
            }
        });
    };

    render() {
        return (
            <>
                <Title level={2}>这就是个登录页</Title>
                <Form
                    name='normal_login'
                    className='login-form'
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}>
                    <Form.Item name='username' rules={[{ required: true, message: '请输入用户名!' }]}>
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='用户名' />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input
                            prefix={<LockOutlined className='site-form-item-icon' />}
                            type='password'
                            placeholder='密码'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}
