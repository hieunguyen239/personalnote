import React, { Component } from 'react';

import NewNote from './Pages/NewNote';
import Home from './Pages/Home';
import Tags from './Pages/Tags';
import Trash from './Pages/Trash';
import SearchResult from './Pages/SearchResults';
import NotFound from './Pages/NotFound';
import AllNote from './Pages/AllNotes';

import userImg from '../images/icon-1.jpg';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="dashboard">
                    <aside className="left-sidebar">
                        <div className="user">
                            <img src={userImg} />
                            <div className="userName">Nguyen Huynh Thanh Hai</div>
                        </div>
                        <div class="navbar">
                            <section className="new-note-container">
                                <NavLink exact to="/create-new-note" activeClassName="selected" >
                                    <div className="nav-item">
                                        <i className="fa fa-plus-circle new-sign"></i>
                                        <span className="link active" id="link-create-new-note">New Note</span>
                                    </div>
                                </NavLink>
                            </section>
                            <section className="ulities">
                                <ul className="ulities-main list">
                                    <li>
                                        <NavLink to="all-notes" activeClassName="selected">
                                            <div className="nav-item">
                                                <i className="fa fa-sticky-note-o nav-icon"></i>
                                                <span className="link active" id="link-all-note">All Notes</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="tags" activeClassName="selected">
                                            <div className="nav-item">
                                                <i className="fa fa-tag nav-icon"></i>
                                                <span className="link" id="link-all-tag">Tags</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="trash" activeClassName="selected">
                                            <div className="nav-item">
                                                <i className="fa fa-trash-o nav-icon"></i>
                                                <span className="link" id="link-trash">Trash</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </aside>

                    <div className="right-sidebar">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/create-new-note' component={NewNote} />
                            <Route path='/all-notes' component={AllNote} />
                            <Route path='/tags' component={Tags} />
                            <Route path='/trash' component={Trash} />
                            <Route path='/search' component={SearchResult} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>

                    <div className="main-content">
                        <input type="text" placeholder="TOA teams" className="input-name" />
                        <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque mollitia neque dignissimos? Deleniti fuga fugiat dolorum laborum officia dolore reprehenderit. Saepe unde nulla deserunt autem quas ducimus blanditiis veniam id, laboriosam doloremque consequuntur illum cupiditate eos repellendus eum veritatis odit recusandae incidunt in tempore esse dolor. Dolore tempore recusandae exercitationem rerum doloremque quasi nisi architecto repellat sint vitae officiis eius nemo deserunt unde assumenda, ratione laudantium rem? Temporibus odio debitis assumenda dicta nulla quam, quae vero dignissimos sint? Accusamus fugiat officia possimus mollitia non harum placeat dolores eaque consequuntur dolore quos tempore sint voluptatem dolor magnam deserunt, cupiditate saepe maiores necessitatibus corrupti quaerat voluptas. Natus sint dicta fuga accusantium minima, architecto dolorem laboriosam facere delectus in corporis id odio maiores alias debitis non eos ad tempora eum vero temporibus atque! Commodi, nemo quasi molestiae perferendis inventore doloremque eum sunt provident, illo, saepe totam autem? Voluptatum atque dolorem ratione corporis voluptate.</p>
                    </div>
                </div>
            </Router>
        );
    }
}

export default DashBoard;