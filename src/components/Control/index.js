import React, { Component } from 'react';
import { Button } from 'antd';

export default class Control extends Component {

	constructor() {
		super()
		this.toggleSwitch = this.toggleSwitch.bind(this);
	}

	toggleSwitch(way) {
		fetch('/buttons', {method: "POST", body: JSON.stringify({way: way})} )
			.then((res) => { res.text() }).then((res) => {
				console.log(res)
			})
	}

	render() {
		return (
			<div>
				<p><Button onClick={()=>{this.toggleSwitch("on")}}>On</Button> <Button onClick={()=>{this.toggleSwitch("off")}}>Off</Button></p>
			</div>
		)
	}

}

