import React, { Component } from 'react';
import { Icon } from 'antd';
import io from 'socket.io-client';

import Databox from '../Databox';

export default class Lux extends Component {

	constructor() {
		super()
		this.state = {
			lux: 0
		}
	}

	componentDidMount() {
		const socket = io()
		socket.on('lux', body => {
			this.setState({ lux: body })
		})
	}

	render() {
		return (
			<div>
				<Databox name="明るさセンサ" icon={<Icon type="fire" theme="outlined" />} data={ this.state.lux } />
			</div>
		)
	}

}

