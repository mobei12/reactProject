import React from 'react'


const { BrowserRouter, Route, Switch, Redirect } = require('react-router-dom')
import loadable from './utils/loadable'
import './style/view-style/animation.scss'
import './style/App.scss'

// 公共模块
import Home from './views/home'

// 基础页面
const Login = loadable(() => import(/* webpackChunkName: 'login' */ './views/login'))

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/' exact render={() => <Redirect to='/index' />} />
			<Route path='/login' component={Login} />
			<Route component={Home} />
		</Switch>
	</BrowserRouter>
)

export default App
