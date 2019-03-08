import React, { Component } from 'react';
import io from 'socket.io-client';

export default class Human extends Component {
	constructor() {
		super()
		this.state = {
			human: 0
		}
	}

	componentDidMount() {
		const socket = io()
		socket.on('human', body => {
			this.setState({ human: body })
		})
	}

	render() {
		return (
			<div>
                <h3>人の人数: {this.state.human}</h3>
			</div>
		)
	}
}
