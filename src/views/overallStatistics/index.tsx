import './index.scss'

import React from 'react'
import { Table, Space } from 'antd'
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
			data: {}
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
					<Column title='用户id ' dataIndex='user_id' key='user_id' />
					<Column title='运动类型 ' dataIndex='exercise_type'
					        key='exercise_type' />
					<Column title='运动时间(秒)' dataIndex='duration'
					        key='duration' />
					<Column title='每次休息时间(秒)' dataIndex='single_time'
					        key='single_time' />
					<Column title='休息的次数' dataIndex='number_of_breaks'
					        key='number_of_breaks' />
					<Column title='运动分的次数' dataIndex='number_of_times'
					        key='number_of_times' />
					<Column
						title='Action'
						key='action'
						render={(text, record: { lastName: string }) => (
							<Space size='middle'>
								<a>Invite {record.lastName}</a>
								<a>Delete</a>
							</Space>
						)}
					/>
				</Table>
			</div>
		)
	}
}
