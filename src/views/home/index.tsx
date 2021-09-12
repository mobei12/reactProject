import './index.scss'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'


const { Route, Switch, Link, Redirect } = require('react-router-dom')
import { Layout, Menu, Dropdown } from 'antd'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import routes from '../../routes/index'


const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export default class Home extends React.Component<RouteComponentProps> {
	state = {
		collapsed: false,
		key: 'personalStatistics'
	}

	constructor(props: RouteComponentProps) {
		super(props)
	}

	/*退出登录*/
	handleMenuClick = (e: { key: string }) => {
		if (e.key === '2') {
			localStorage.removeItem('token')
			this.props.history.push('/login')
		}
	}
	/*判断是否登录状态*/
	isLogin = () => {
		if (!localStorage.getItem('token')) {
			this.props.history.push('/login')
		}
	}
	/*菜单折叠*/
	onCollapse = (collapsed: boolean) => {
		this.setState({ collapsed })
	}
	menu = (
		<Menu onClick={this.handleMenuClick}>
			<Menu.Item key='1' icon={<UserOutlined />}>
				个人中心
			</Menu.Item>
			<Menu.Item key='2' icon={<UserOutlined />}>
				退出登录
			</Menu.Item>
		</Menu>
	)

	componentDidMount() {
		this.isLogin()
	}

	render() {
		const { collapsed } = this.state
		let auth = ''
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={collapsed}
				       onCollapse={this.onCollapse}>
					<div className='logo' />
					<Menu theme='dark' defaultSelectedKeys={['statistics']}
					      mode='inline'>
						<SubMenu key='statistics' icon={<PieChartOutlined />}
						         title='统计页面'>
							<Menu.Item key='personalStatistics'>
								<Link to='/statistics/personalStatistics'>
									<span>个人统计</span>
								</Link>
							</Menu.Item>
							<Menu.Item key='overallStatistics'>
								<Link to='/statistics/overallStatistics'>
									<span>整体统计</span>
								</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key='card' icon={<UserOutlined />}>
							<Link to='/cardList'>
								<span>卡片片</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='userList' icon={<UserOutlined />}>
							<Link to='/userList'>
								<span>用户统计</span>
							</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<Header className='site-layout-background'
					        style={{ padding: 0 }}>
						<div className='ant-pro-global-header'>
							<div className='left' />
							<div className='ant-space'>
								<div className='ant-space-item'>
									<Dropdown.Button
										overlay={this.menu}
										placement='bottomCenter'
										icon={<UserOutlined />}>
										漠北哥哥
									</Dropdown.Button>
								</div>
							</div>
						</div>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						{/* //todo 面包屑
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
						<div className='site-layout-background'
						     style={{ padding: 24, minHeight: 360 }}>
							<Switch>
								{routes.map((item) => {
									return (
										<Route
											key={item.path}
											path={item.path}
											exact={item.exact}
											render={(props: object) =>
												!auth ? (
													<item.component {...props} />
												) : item.auth && item.auth.indexOf(auth) !== -1 ? (
													<item.component {...props} />
												) : (
													// 这里也可以跳转到 403 页面
													<Redirect
														to='/404' {...props} />
												)
											}
										/>
									)
								})}
							</Switch>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Did by
						mobeigege</Footer>
				</Layout>
			</Layout>
		)
    }
}
