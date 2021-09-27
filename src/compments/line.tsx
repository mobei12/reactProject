import React from 'react'
import { Line } from '@ant-design/charts'


type Props = {
	data: Array<{}>;
	config: {
		xField: string;
		yField: string;
	};
};
export default class ChartsLine extends React.Component<Props> {
	state = {
		data: [
			{ time: '1991', value: 3 },
			{ time: '1997', value: 7 },
			{ time: '1998', value: 9 },
			{ time: '1999', value: 13 }
		],
		config: {
			height: 400,
			xField: 'time',
			yField: 'value',
			data: [],
			point: {
				size: 5,
				shape: 'diamond'
			}
		}
	}

	componentDidMount() {
		let { data, config } = this.props
		config = config ? Object.assign(config, this.state.config) : this.state.config
		this.setState({
			data,
			config
		})
	}

	componentWillReceiveProps(newProps: Props) {
		let { data } = newProps
		this.setState({
			data
		})
	}

	render() {
		let { data, config } = this.state
		config = Object.assign(config, { data: data })
		return <Line {...config} />
	}
}
