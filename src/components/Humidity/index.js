import React, { Component } from 'react';
import { Icon } from 'antd';
import io from 'socket.io-client';

import Databox from '../Databox';

export default class Humidity extends Component {

	constructor() {
		super()
		this.state = {
			humidity: 0
		}
	}

	componentDidMount() {
		const socket = io()
		socket.on('humidity', body => {
            const t = parseInt(body) // XD
			this.setState({ humidity: t })
		})
	}

	render() {
		return (
			<div>
				<Databox name="湿度" icon={<Icon type="cloud" theme="outlined" />} data={ this.state.humidity } />
			</div>
		)
	}

}

