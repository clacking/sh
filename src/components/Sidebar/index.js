import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Layout, Icon, Menu  } from 'antd';
const { Sider } = Layout;

export default class Sidebbar extends Component {

	constructor() {
		super()
		this.onCollapse = this.onCollapse.bind(this)
		this.handleKey = this.handleKey.bind(this)
	}

	state = {
		collapsed: true,
		current: 1
	}

	onCollapse = (c) => {
		this.setState({collapsed: c});
	}

	handleKey(e) {
		this.setState({ current: e.key });
	}

	render() {
		return (
		<Sider
			collapsible
			collapsed={this.state.collapsed}
			onCollapse={this.onCollapse}>

			<div className="logo" />
			<Menu theme="dark" defaultSelectedKeys={[1]} mode="inline">
					<Menu.Item key="1">
						<Icon type="desktop" />
						<span>Home</span>
						<Link to='/' />
					</Menu.Item>
					 <Menu.Item key="2">
						<Icon type="dashboard" />
						<span>Graph</span>
						<Link to='/graph' />
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="cloud" />
						<span>Live</span>
						<Link to='/live' />
					</Menu.Item>
					<Menu.Item key="4">
						<Icon type="profile" />
						<span>Control</span>
						<Link to='/control' />
					</Menu.Item>
			</Menu>
		</Sider>
		)	
	}

}

