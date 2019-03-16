import React, { Component } from 'react';
import DashBoard from './components/DashBoard';
import 'font-awesome/css/font-awesome.css';
import './styles/components/reset.css'
import './styles/components/main.scss';

import {connect} from 'react-redux';

class App extends Component {
  render() {
    const props = this.props.noteReducer;
    return (
      // <div className={"App " + ((props.is_busy) ? "loading" : "")}>
      <div className="App">
        <DashBoard />
      </div>
    );
  }
}

function mapStateToProps(state, props){
  return{
    noteReducer: state.noteReducer
  }
}

export default connect(mapStateToProps)(App);
