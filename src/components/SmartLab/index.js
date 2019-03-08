import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { Route, Switch } from 'react-router-dom';

import Head from '../Head';
import Logger from '../Logger';
import Control from '../Control';
import Sidebar from '../Sidebar';
import Graphs from '../Graphs';
import Live from '../Live';
const { Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

export default class SmartLab extends Component {

	render() {
    return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar></Sidebar>
			<Layout>
				<Head />
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<Switch>
								<Route exact path='/' component={Logger} />
								<Route path='/live' component={Live} />
								<Route path='/graph' component={Graphs} />
								<Route path='/control' component={Control} />
							</Switch>
						</div>
					</Content>
				<Footer style={{ textAlign: 'center' }} />
			</Layout>
		</Layout>
	);
	}

}
