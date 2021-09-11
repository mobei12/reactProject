import './index.scss'

import React from 'react'
import { Table, Space } from 'antd'
import Axios from '../../utils/http'
import { translateDate } from '../../utils/util'


const { Column } = Table
export default class UserList extends React.Component {
	state = {
		datas: []
	}
	getdata = () => {
		Axios('/api/user/getUserList', {
			method: 'GET',
			responseType: 'json',
			params: {}
		}).then((response) => {
			console.log(response)
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
					<Column title='用户名 ' dataIndex='username' key='username' />
					<Column
						title='注册日期'
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
