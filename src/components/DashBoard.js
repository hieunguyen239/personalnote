import React, { Component } from 'react';

import NewNote from './Pages/NewNote';
import Home from './Pages/Home';
import Tags from './Pages/Tags';
import Trash from './Pages/Trash';
import SearchResult from './Pages/SearchResults';
import NotFound from './Pages/NotFound';
import AllNotes from './Pages/AllNotes';

import userImg from '../images/icon-1.jpg';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


// dependencies của editor
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     editorState: EditorState.createEmpty()
        // }
    }

    // onEditorStateChange = (editorState) => {
    //     this.setState({
    //         editorState,
    //     });
    // };




    render() {
        // const { editorState } = this.state;
        return (
            <Router>
                <div className="dashboard">
                    <aside className="left-sidebar">
                        <div className="user">
                            <img src={userImg} />
                            <div className="userName">Nguyen Huynh Thanh Hai</div>
                        </div>
                        <div className="navbar">
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
                            <Route path='/all-notes' component={AllNotes} />
                            <Route path='/tags' component={Tags} />
                            <Route path='/trash' component={Trash} />
                            <Route path='/search' component={SearchResult} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>

                    <div className="main-content">
                        <input type="text" placeholder="TOA teams" className="input-name" />
                        <div className="content">

                            {/* <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                toolbarOnFocus
                                toolbar={{
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                }}
                                onEditorStateChange={this.onEditorStateChange}
                            />

                            <textarea
                                disabled
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            /> */}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default DashBoard;