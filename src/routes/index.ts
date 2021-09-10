import loadable from '../utils/loadable'


const cardList = loadable(() => import('../views/cardList'))
const personalStatistics = loadable(() => import('../views/personalStatistics'))
const overallStatistics = loadable(() => import('../views/overallStatistics'))
const userList = loadable(() => import('../views/userList'))

interface routerObj {
	path: string;
	exact: Boolean;
	name: string;
	component: any;
	auth?: any;
}

const routes: Array<routerObj> = [
	{
		path: '/cardList',
		exact: false,
		name: '卡片列表',
		component: cardList
	},
	{
		path: '/statistics/personalStatistics',
		exact: false,
		name: '个人统计',
		component: personalStatistics
	},
	{
		path: '/statistics/overallStatistics',
		exact: false,
		name: '个人统计',
		component: overallStatistics
	},
	{
		path: '/userList',
		exact: false,
		name: '个人统计',
		component: userList
	}
]
export default routes
