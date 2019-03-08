import React, { Component } from 'react';

import Logger from '../Logger';
import Control from '../Control';
import Sidebar from '../Sidebar';
import Clock from '../Clock';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class Men extends Component {

  render() {
    return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar></Sidebar>
			<Layout>
				<Clock />
				<Header style={{ background: '#fff', padding: 0 }}>
				<h1 style={{ margin: 8 }}>SmartLab</h1>
				</Header>
				<Content style={{ margin: '0 16px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<Logger />
				</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
				</Footer>
			</Layout>
		</Layout>
	);
	}

}
