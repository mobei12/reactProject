import './index.scss'

import React from 'react'
import { Table, Space, Tag, Drawer } from 'antd'
import { translateDate } from '../../utils/util'
import Axios from '../../utils/http'
import loadable from '../../utils/loadable'


const ChartsLine = loadable(() => import('../../compments/line'))
const { Column } = Table
export default class OverallStatistics extends React.Component {
	state = {
		datas: [],
		visible: false,
		user: {
			username: undefined,
			_id: undefined
		},
		config: {
			xField: 'time',
			yField: 'value'
		},
		lineData: []
	}
	/*数据获取*/
	getData = () => {
		Axios('/api/exerciseRecord/findAll', {
			method: 'GET',
			responseType: 'json',
			params: {}
		}).then((response) => {
			this.setState({ datas: JSON.parse(response.data) })
		})
	}
	/*数据获取*/
	getDatabyUserId = (user: { _id: string }) => {
		this.setState({
			user: user
		})
		Axios('/api/exerciseRecord/find', {
			method: 'GET',
			responseType: 'json',
			params: { user_id: user._id }
		}).then((response) => {
			const recordData = JSON.parse(response.data).map((val: { duration: number; ctime: string }) => {
				return {
					time: translateDate(val.ctime),
					value: val.duration
				}
			})
			this.setState({
				lineData: recordData,
				visible: true
			})
		})
	}
	/*打开弹窗*/
	showDrawer = () => {
		this.setState({
			visible: true
		})
	}
	/*关闭弹窗*/
	onClose = () => {
		this.setState({
			visible: false
		})
	}

	componentDidMount() {
		this.getData()
	}

	render() {
		const { datas, visible, user, lineData } = this.state
		return (
			<div className='App'>
				<Table dataSource={datas}>
					<Column
						title='用户名 '
						dataIndex='users'
						key='users'
						render={(text, record: { users: Array<{ username: string; _id: string }> }) => (
							<Space size='middle'>
								<a onClick={() => this.getDatabyUserId(record.users[0])}>{text[0].username}</a>
							</Space>
						)}
					/>
					<Column
						title='运动类型 '
						dataIndex='exercise_type'
						key='exercise_type'
						render={(text) => <Tag
							color={'blue'}>{text.toUpperCase()}</Tag>}
					/>
					<Column title='运动时间(秒)' dataIndex='duration'
					        key='duration' />
					<Column title='每次休息时间(秒)' dataIndex='single_time'
					        key='single_time' />
					<Column title='休息的次数' dataIndex='number_of_breaks'
					        key='number_of_breaks' />
					<Column title='运动分的次数' dataIndex='number_of_times'
					        key='number_of_times' />
					<Column
						title='运动日期'
						dataIndex='ctime'
						key='ctime'
						render={(text) => <Space
							size='middle'>{translateDate(text)}</Space>}
					/>
				</Table>
				<Drawer
					title={user.username + '的运动统计'}
					placement='top'
					height='600'
					onClose={this.onClose}
					visible={visible}>
					<ChartsLine data={lineData} />
				</Drawer>
			</div>
		)
	}
}
