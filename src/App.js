import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import SmartLab from './components/SmartLab';

class App extends Component {
  render() {
    return (
		<BrowserRouter>
			<SmartLab />
		</BrowserRouter>
    );
  }
}

export default App;
