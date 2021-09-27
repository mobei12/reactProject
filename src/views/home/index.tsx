import './index.scss'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'


const { Route, Switch, Link } = require('react-router-dom')
import { Layout, Menu, Dropdown, Breadcrumb } from 'antd'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import routes from '../../routes/index'


const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export default class Home extends React.Component<RouteComponentProps> {
	state = {
		collapsed: false,
		key: 'personalStatistics',
		username: '漠北哥哥'
	}

	constructor(props: RouteComponentProps) {
		super(props)
	}

	/*退出登录*/
	handleMenuClick = (e: { key: string }) => {
		if (e.key === '2') {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			this.props.history.push('/login')
		}
	}
	/*判断是否登录状态*/
	isLogin = () => {
		/*获取用户对象*/
		const usertStr: string | null = localStorage.getItem('user')
		if (!usertStr) {
			this.props.history.push('/login')
			return
		}
		let user: { username?: string } = JSON.parse(usertStr)
		this.setState({ username: user.username })
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
										{this.state.username}
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
												<item.component {...props} />}
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
