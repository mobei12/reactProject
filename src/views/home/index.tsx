import './index.scss'
import React from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, message } from 'antd'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'

function handleMenuClick(e: object) {
    console.log('click', e)
}

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key='1' icon={<UserOutlined />}>
            个人中心
        </Menu.Item>
        <Menu.Item key='2' icon={<UserOutlined />}>
            退出登录
        </Menu.Item>
    </Menu>
)

export default class Home extends React.Component {
    state = {
        collapsed: false,
        key: 'personalStatistics'
    }
    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed })
    }
    onSelectMenu = (menuKey: string) => {
        this.setState({ key: menuKey })
    }

    render() {
        const { collapsed, key } = this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className='logo' />
                    <Menu theme='dark' defaultSelectedKeys={['statistics']} mode='inline'>
                        <SubMenu key='statistics' icon={<PieChartOutlined />} title='统计页面'>
                            <Menu.Item key='personalStatistics'>个人统计</Menu.Item>
                            <Menu.Item key='overallStatistics'>整体统计</Menu.Item>
                        </SubMenu>
                        <Menu.Item
                            key='user'
                            onClick={() => {
                                this.onSelectMenu('user')
                            }}
                            icon={<UserOutlined />}>
                            个人中心
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className='site-layout'>
                    <Header className='site-layout-background' style={{ padding: 0 }}>
                        <div className='ant-pro-global-header'>
                            <div className='left' />
                            <div className='ant-space'>
                                <div className='ant-space-item'>
                                    <Dropdown.Button overlay={menu} placement='bottomCenter' icon={<UserOutlined />}>
                                        漠北哥哥
                                    </Dropdown.Button>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
                            {key}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Did by mobeigege</Footer>
                </Layout>
            </Layout>
        )
    }
}
