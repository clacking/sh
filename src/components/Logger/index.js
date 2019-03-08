import React, { Component } from 'react';
import { Row, Col } from 'antd';
import io from 'socket.io-client';

import Lux from '../Lux';
import Temperature from '../Temperature';
import Humidity from '../Humidity';
import Human from '../Human';
import Dataview from '../Graphview'

export default class Logger extends Component {
	constructor() {
		super()
		this.state = {
			log: []
		}
	}

	componentDidMount() {
		const socket = io()
		socket.on('log', body => {
			const d = { time: new Date().toString(), body: body }
			this.setState({ log: [...this.state.log, d] })
		})
	}

	render() {
		return (
			<div>
				<h2>Logger</h2>
				<Row gutter={16}>
				<Col span={4}><Temperature/></Col>
				<Col span={4}><Humidity/></Col>
				<Col span={4}><Lux/></Col>
				</Row>
				<Human/>
				<div><Dataview title='Temperature' path='temperature'/></div>
			</div>
		)
	}
}

