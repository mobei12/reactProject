import './index.scss'

import React from 'react'
import { Table, Space, Tag } from 'antd'
import { translateDate } from '../../utils/util'
import Axios from '../../utils/http'


const { Column } = Table
export default class OverallStatistics extends React.Component {
	state = {
		datas: []
	}
	getdata = () => {
		Axios('/api/exerciseRecord/findAll', {
			method: 'GET',
			responseType: 'json',
			params: {}
		}).then((response) => {
			this.setState({ datas: JSON.parse(response.data) })
		})
	}

	componentDidMount() {
		this.getdata()
	}

	render() {
		const { datas } = this.state
		return (
			<div className='App'>
				<Table dataSource={datas}>
					<Column
						title='用户名 '
						dataIndex='users'
						key='users'
						render={(text) => <Space
							size='middle'>{text[0].username}</Space>}
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
			</div>
		)
	}
}
