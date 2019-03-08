import React, { Component } from 'react';
import { format } from 'date-fns';

/**
 * Clock for header.
 */
export default class Clock extends Component {

	constructor() {
		super()
		this.updateTime = this.updateTime.bind(this)
	}

	state = {
		time: new Date(),
		formated: ''
	}

	componentDidMount() {
		this.timer = setInterval(this.updateTime, 1000)
	}

	componentWillUnmount() {
		//clearInterval(this.timer)
	}

	updateTime() {
		const d = new Date()
		const date = format(d, 'YYYY/MM/DD HH:mm:ss')
		this.setState({time: d, formated: date})
	}

	render() {
		return (
			<span style={{ lineHeight: '20px', display: 'inherit'}}>
				{ this.state.formated }
			</span>
		)
	}
}

