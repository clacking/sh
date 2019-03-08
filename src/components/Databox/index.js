import React, { Component } from 'react';

import styles from  './style.module.css';

export default class Databox extends Component {
	render() {
		return (
			<div className={styles.box}>
				<h2 className={styles.title}>{this.props.name}</h2>
				<span className={styles.icon}>{this.props.icon}</span>
				<span className={styles.data}><span>{this.props.data}</span></span>
			</div>
		)
	}
}
