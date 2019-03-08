import React, { Component } from 'react';
import { Layout } from 'antd';

import Smolbar from '../Smolbar';

export default class Head extends Component {

	render() {
		return (
			<Layout.Header style={{ background: '#fff', height: 'auto', padding: '0 16px' }}>
				<h1 style={{lineHeight: '40px', margin: '0'}}>SmartLab</h1>
				<Smolbar/>
			</Layout.Header>
		)
	}

}

