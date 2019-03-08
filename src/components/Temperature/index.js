import React, { Component } from 'react';
import { Icon } from 'antd';
import io from 'socket.io-client';

import Databox from '../Databox';

export default class Temperature extends Component {

	constructor() {
		super()
		this.state = {
			temperature: 0
		}
	}

	componentDidMount() {
		const socket = io()
		socket.on('temperature', body => {
            const t = parseInt(body) // XD
			this.setState({ temperature: t })
		})
	}

	render() {
		return (
			<div>
                <Databox name="温度" icon={<Icon type="fire" theme="outlined" />} data={ this.state.temperature+'℃' } />
			</div>
		)
	}

}

