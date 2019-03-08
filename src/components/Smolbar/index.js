import React, { Component } from 'react';
import Clock from '../Clock';

import styles from './style.module.css';

export default class Smolbar extends Component {

	render() {
		return (
			<div class={styles.smolbar}>
				<Clock />
			</div>
		)
	}
}
