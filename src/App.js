import React, { Component } from 'react';
import DashBoard from './components/DashBoard';
import 'font-awesome/css/font-awesome.css';
import './styles/components/reset.css'
import './styles/components/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DashBoard />
      </div>
    );
  }
}

export default App;
