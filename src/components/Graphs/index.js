import React, { Component } from 'react';
import io from 'socket.io-client';
import Dataview from '../Graphview';

export default class Graphs extends Component {

	state = {
		message: ''
	}

	componentWillMount() {
		fetch('/buttons', {method: 'POST',headers: {'Content-Type': 'application/json'}, body:JSON.stringify({way: 'on'}) }).then(r=>r.text()).then(res => {
			this.setState({message: res})
		})

		const socket = io('localhost:8080')
	}

	render() {
		return (
			<>
				<p>Latest 1 minutes.</p>
				<div><Dataview title='Temperature' path='temperature'/></div>
				<div><Dataview title='Humidity' path='humidity'/></div>
			</>
		)
	}


}
