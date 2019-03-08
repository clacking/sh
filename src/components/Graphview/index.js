import React, { Component } from 'react';
import { Line } from '@nivo/line';
import { message } from 'antd';
import io from 'socket.io-client';
import { format } from 'date-fns';
//import { DynamoDB } from 'aws-sdk';

const scale = {
	data: {alias: 'Temp.'},
	createdAt: {alias: 'Sec'}
}

const limitDatas = 60;

const getMinMax = (mi, ma) => {
	return { min: mi-0.6, max: ma+0.5 }
}

const dateSort = (a, b) => {
	return new Date(a.y) - new Date(b.y)
}

const formatStyle = 'YYYY/MM/DD HH:MM:ss:SS';

export default class Dataview extends Component {
	constructor(props) {
		super(props)
		this.state = {data: [], min:0, max:0, last: ''}
	}

	async fetchData() {
		let min = 0, max = 0;
		fetch(`/${this.props.path}?%24limit=${limitDatas}&%24sort=-createdAt`).then(d => {
			if(d.ok) return d.json()
			throw new Error('Error: failed to fetch data.')
		}).then(json =>{
			const data = json.docs.map(d => {
				if(d.data<min | max===0) min = d.data;
				if(d.data>max) max = d.data;
				return {y: d.data, x: format(d.createdAt, formatStyle)}
			})
			const sorted = data.sort(dateSort)
			const mm = getMinMax(min, max);
			const last = format(data[data.length-1].x, formatStyle)
			this.setState({data: sorted, ...mm, last: last})
		}).catch(e => {
			message.error(e.message)
		})
	}

	componentDidMount() {
		this.fetchData()
		const socket = io()
		socket.on(this.props.path, body => {
			const date = format(new Date(), formatStyle);
			const d = {y: parseFloat(body), x: date}
			const old = this.state.data.slice(1, limitDatas)
			const min = (d.y<this.state.min)? d.y-0.5 : this.state.min;
			const max = (d.y>this.state.max)? d.y+0.5 : this.state.max;
			this.setState({data: [...old, d], last: date, min: min, max: max})
		})
	}

	dateSort(a, b) {
		return new Date(a.y) - new Date(b.y)
	}

	render() {
		return (
			<>
				<h2>{this.props.title}</h2>
				<p>Last date: {this.state.last}</p>
				<Line 
					data={[{ id: this.props.path, data: this.state.data}]}
					xScale={{type:'point'}}
					yScale={{type: 'linear', min: this.state.min, max:this.state.max, stacked: true}}
					margin={{
						top: 20,
						right: 20,
						bottom: 60,
						left: 80
					}}
					width={900}
					height={400}
					axisTop={null}
					axisBottom={{ tickRotation: -90, }}
					axisRight={null}
					enableGridX={false}
					animate={false}
					motionStiffness={90}
				/>
			</>
		)
	}
}
