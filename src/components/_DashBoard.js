import React, {Component} from 'react';

import NewNote from './Pages/NewNote';
import Home from './Pages/Home';
import Tags from './Pages/Tags';
import Trash from './Pages/Trash';
import SearchResult from './Pages/SearchResults';
import NotFound from './Pages/NotFound';
import AllNote from './Pages/AllNotes';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

class DashBoard extends Component{
    constructor(props){
        super(props);
    }

    render(){
       return(
        <Router>
            <div className="dashboard">
                <aside className="left-sidebar">
                    <section className="new-note-container">
                        <NavLink exact to="/create-new-note" activeClassName="selected" ><span className="link" id="link-create-new-note"><i className="fa fa-plus"></i>Create a New Note</span></NavLink>
                    </section>
                    <section className="ulities">
                        <ul className="ulities-main list">
                            <li>
                                <NavLink to="all-notes" activeClassName="selected"><span className="link" id="link-all-note">All Notes</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="tags" activeClassName="selected"><span className="link" id="link-all-tag">Tags</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="trash" activeClassName="selected"><span className="link" id="link-trash">Trash</span></NavLink>
                            </li>
                        </ul>
                    </section>
                </aside>
            
                <div className="main-content">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/create-new-note' component={NewNote} />
                            <Route path='/all-notes' component={AllNote} />
                            <Route path='/tags' component={Tags} />
                            <Route path='/trash' component={Trash} />
                            <Route path='/search' component={SearchResult} />
                            <Route component={NotFound} />
                        </Switch>
                    
                </div>
            </div>
        </Router>
       );
    }
}

export default DashBoard;
